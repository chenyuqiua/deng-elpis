<!doctype html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="/static/normalize.css" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ name }}</title>
  </head>
  <body style="color: red">
    <h1>prot: {{ port }}</h1>
    <button id="btn" onclick="handleGetList()">get list</button>
    <script>
      const handleGetList = async () => {
        const res = await fetch('/api/project/list');
        const data = await res.json();
        console.log(data);
      };
    </script>
  </body>
</html>
