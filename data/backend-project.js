const xhr = new XMLHttpRequest()

xhr.addEventListener('load', () => {
   // const html = xhr.response
   // document.querySelector('main').innerHTML = html
   console.log('html');
})
xhr.open('GET', 'https://supersimplebackend.dev/documentation')
xhr.send()