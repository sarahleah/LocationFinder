let button = document.querySelector('button')
let form = document.querySelector('form')

function handleFindLocation(e) {
	e.preventDefault()

	function getCoordinates() {
		var options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		}

		function success(pos) {
			let crds = pos.coords
			let lat = crds.latitude.toString()
			let long = crds.longitude.toString()
			console.log(`Latitude: ${lat}, Longitude: ${long}`)
			let coords = [lat, long]
			getCity(coords)
		}

		function error(err) {
			console.warn(err)
		}

	navigator.geolocation.getCurrentPosition(success, error, options)

	}

	getCoordinates()

	function getCity(coords) {
		let [lat, long] = coords
		axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=pk.d14395593ebaf13fd2e1f92b8efa2389&lat=${lat}&lon=${long}&format=json`)
			.then(res => console.log(res.data.display_name))
	}
}

form.addEventListener('submit', handleFindLocation)