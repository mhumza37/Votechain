$(document).ready(function () {

	var loc = window.location.href; // returns the full URL

	if (/register/.test(loc)) {
		$('#register').addClass('active');
	} else if (/vote/.test(loc)) {
		$('#vote').addClass('active');
	} else if (/results/.test(loc)) {
		$('#results').addClass('active');
	} else if (/admin/.test(loc)) {
		$('#admin').addClass('active');
	}

	camera = new JpegCamera("#camera");

	$("#take_snapshots").click(function () {
		take_snapshots(1);
		$('#camera, #take_snapshots').hide();
		$('#snapshots').show();
		$('#register_btn').attr('disabled', false);
		setTimeout(function () {
			addImageToForm();
		}, 1000)
	});

	$('#register_btn').click(function () {
		$('#cam_col, #reg_col').hide();
		$('#register_row').append(`<div class="col-md-12">
									<div class="jumbotron jumbotron-fluid">
										<div class="container">
											<h1 class="display-4 text-center">Registration Completed</h1>
											<p class="lead text-center">
											Please Wait...
											Downloading your QR Code...
											<div>
												<div class="lds-css ng-scope"><div style="width:100%;height:100%" class="lds-ellipsis"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>
												</div>
											</div>
											</p>
										</div>
									</div>
								</div>`);
	});
});

var QR_Data;

var upload_qr = function (event) {
	$('.lds-spinner').hide();
	var reader = new FileReader();
	reader.onload = function () {
		var output = document.getElementById('qr_img');
		output.src = reader.result;
		QR_Data = reader.result;
		$('#upload_qr').hide();
		$('#submit_qr').show();
		alert("QR Code Uploaded");
	};
	reader.readAsDataURL(event.target.files[0]);
};

var submit_qr_func = function (event) {
	$('#qr_img').hide();
	$('#txtmsg').html(`Capture your face to verify your identity`);
	$('#submit_qr').hide();
	$('#capture_img').show();
	$('#camera').show();
	camera = new JpegCamera("#camera");
}

var capture_img_func = function (event) {
	take_snapshots(1);
	$('#camera, #capture_img').hide();
	$('#snapshots, #verify_btn').show();
	setTimeout(function () {
		addImageToForm();
	}, 1000)
};

var take_snapshots = function (count) {
	var snapshot = camera.capture();
	snapshot.get_canvas(add_snapshot);
};

var select_snapshot = function () {
	$(".item").removeClass("selected");
	var snapshot = $(this).addClass("selected").data("snapshot");
	snapshot.show();
};

var add_snapshot = function (element) {
	$(element).data("snapshot", this).addClass("item");

	var $container = $("#snapshots").append(element);
	var $camera = $("#camera");
	var camera_ratio = $camera.innerWidth() / $camera.innerHeight();

	var height = $container.height()
	element.style.height = "" + height + "px";
	element.style.width = "" + Math.round(camera_ratio * height) + "px";

	var scroll = $container[0].scrollWidth - $container.innerWidth();
};

function addImageToForm() {
	var canvas = $('#snapshots > canvas').get(0);
	var imageData = canvas.toDataURL();
	document.getElementsByName("avatar")[0].setAttribute("value", imageData);
	document.getElementsByName("qrdata")[0].setAttribute("value", QR_Data);
};