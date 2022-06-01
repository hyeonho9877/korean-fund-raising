const express = require('express');
const app = express();
const port = 3000;

// "GET / "을 수행할 때 index 폴더에 있는 .html과 .js 파일을 렌더링합니다
app.use(express.static('index'))
app.use('/detail', express.static('detail'))
app.use('/pay', express.static('pay'))

app.listen(port, () => {
  console.log(`Korean Fund Raising app is running in port ${port}`)
})