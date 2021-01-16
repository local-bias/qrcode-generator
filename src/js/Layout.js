import React from 'react';
import qrcode from 'qrcode';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Skeleton from '@material-ui/lab/Skeleton';

const CANVAS_ID = 'qrCanvas';

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

  function download(e) {

    if (!input) {
      return;
    }

    qrcode.toDataURL(
      input,
      (error, url) => {
        if (error) {
          console.log(error);
          return;
        }
        const a = document.createElement("a");
        document.body.append(a);
        a.download = 'qr-code.jpg';
        a.href = url;
        a.click();
        a.remove();
      }
    );
  }

  return (
    <div id="app-wrapper">
      <TextField id="inputSrc" label="QRコードに変換する文字列・URL" variant="outlined" onChange={onChangeSrc} value={input} fullWidth placeholder="https://" />
      <div className="spacer" />
      {input ? null : <Skeleton variant="rect" width={200} height={200} />}
      <canvas id={CANVAS_ID} style={{ display: input ? "block" : "none" }} />
      <div className="spacer" />
      <Button variant="contained" color="primary" onClick={download} >ダウンロード</Button>
    </div>
  );
}