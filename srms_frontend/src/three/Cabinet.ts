// const path = "https://mock.apifox.cn/m1/1194686-0-default/cabinet/"
const path = "http://127.0.0.1:8000/api/server/"


function getCabinetByName(name: string) {

  return fetch(path + name, {
    method: 'GET',
  }).then((res) => {
    return res.text()
  }).then(data => {
    return data
  });
}

export { getCabinetByName }