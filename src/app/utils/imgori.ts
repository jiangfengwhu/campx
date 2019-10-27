export const getOrientation = (file: File, callback: Function) => {
  var reader = new FileReader();

  reader.onload = (event: ProgressEvent) => {
    if (!event.target) {
      return;
    }

    const file = event.target as FileReader;
    const view = new DataView(file.result as ArrayBuffer);

    if (view.getUint16(0, false) != 0xffd8) {
      return callback(-2);
    }

    const length = view.byteLength;
    let offset = 2;

    while (offset < length) {
      if (view.getUint16(offset + 2, false) <= 8) return callback(-1);
      let marker = view.getUint16(offset, false);
      offset += 2;

      if (marker == 0xffe1) {
        if (view.getUint32((offset += 2), false) != 0x45786966) {
          return callback(-1);
        }

        let little = view.getUint16((offset += 6), false) == 0x4949;
        offset += view.getUint32(offset + 4, little);
        let tags = view.getUint16(offset, little);
        offset += 2;
        for (let i = 0; i < tags; i++) {
          if (view.getUint16(offset + i * 12, little) == 0x0112) {
            return callback(view.getUint16(offset + i * 12 + 8, little));
          }
        }
      } else if ((marker & 0xff00) != 0xff00) {
        break;
      } else {
        offset += view.getUint16(offset, false);
      }
    }
    return callback(-1);
  };

  reader.readAsArrayBuffer(file);
};