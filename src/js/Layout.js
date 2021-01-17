import React from 'react';
import qrcode from 'qrcode';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Skeleton from '@material-ui/lab/Skeleton';

const CANVAS_ID = 'qrCanvas';

const DOWNLOAD_FILE_NAME = 'qr-code.jpg';

export default props => {

  const [input, setInput] = React.useState('');

  function onChangeSrc(e) {
    setInput(e.target.value);

    if (e.target.value) {
      qrcode.toCanvas(
        document.getElementById(CANVAS_ID),
        e.target.value,
        err => { if (err) { console.log(err) } }
      );
    }
  }

  function onClickDownload(e) {

    if (!input) {
      return;
    }

    qrcode.toDataURL(
      input,
      (err, url) => err ? console.log(err) : download(url, DOWNLOAD_FILE_NAME)
    );
  }

  return (
    <div id="app-wrapper">
      <TextField
        id="inputSrc"
        label="QRコードに変換する文字列・URL"
        variant="outlined"
        onChange={onChangeSrc}
        value={input}
        fullWidth
        placeholder="https://"
      />
      <div className="spacer" />
      {input ? null : <Skeleton variant="rect" width={200} height={200} />}
      <canvas id={CANVAS_ID} style={{ display: input ? "block" : "none" }} />
      <div className="spacer" />
      <Button variant="contained" color="primary" onClick={onClickDownload} >ダウンロード</Button>
    </div>
  );
}

function download(url, name) {
  const a = document.createElement("a");
  document.body.append(a);
  a.download = name;
  a.href = url;
  a.click();
  a.remove();
}