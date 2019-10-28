import pic from './1.png'
function createImg() {
	var img = new Image()
img.src = pic
img.classList.add('imgs')
var root  = document.getElementById('root')
root.append(img)
}
export default createImg