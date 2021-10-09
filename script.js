let button = document.querySelector('button')
let form = document.querySelector('form')
let input = document.querySelector('input')
let select = document.querySelector('select')

let initCoords = [0,0]
let secCoords = [0,0]
let latChange = 0
let longChange = 0

function handleFindLocation(e) {
	e.preventDefault()

	let distance = Number(input.value)
	let direction = select.value
	
	function getCoordinates() {

		var options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		}

		function success(pos) {
			let crds = pos.coords
			let lat = crds.latitude
			let long = crds.longitude
			console.log(`Latitude: ${lat}, Longitude: ${long}`)
			initCoords = [lat.toString(), long.toString()]

			if (direction === 'North') {
				latChange = distToDegLat(distance)
				longChange = 0
			} else if (direction === 'South') {
				latChange = distToDegLat(distance * -1)
				longChange = 0
			} else if (direction === 'East') {
				longChange = distToDegLong(distance, lat)
				latChange = 0
			} else {
				longChange = distToDegLong(distance * -1, lat)
				latChange = 0
			}
			
			secCoords = [(lat+latChange).toString(), (long+longChange).toString()]
			console.log(secCoords)
			getCity(initCoords)
			getCity(secCoords)
		}

		https://eu1.locationiq.com/v1/reverse.php?key=pk.d14395593ebaf13fd2e1f92b8efa2389&lat=-32.9286892&lon=function%20toString()%20{%20[native%20code]%20}&format=json

		function error(err) {
			console.warn(err)
		}
		navigator.geolocation.getCurrentPosition(success, error, options)
	}

	getCoordinates()
	// getCity(secCoords)
}

function getCity(coords) {
		let [lat, long] = coords
		axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=pk.d14395593ebaf13fd2e1f92b8efa2389&lat=${lat}&lon=${long}&format=json`)
			.then(res => console.log(res.data.display_name))
			.catch(err => console.log("looks like you're in the ocean"))
	}

function degToRad(deg) {
	return deg * (Math.PI / 180)
}

function distToDegLat(dist) {
	return dist/110.574
}

function distToDegLong(dist, lat) {
	console.log(dist/(111.320*(Math.cos(degToRad(lat)))))
	return dist/(111.320*(Math.cos(degToRad(lat))))
}

form.addEventListener('submit', handleFindLocation)