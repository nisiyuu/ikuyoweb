//video要素とそれをキャプチャするcanvas要素を生成
import * as THREE from "three";



function tv() {
    var video = document.createElement('video');
    video.src = "/tv.mp4";
    video.load();
    video.muted = true;
    video.play();

    var videoImage = document.createElement('canvas');
    videoImage.width = 480;
    videoImage.height = 200;

    var videoImageContext = videoImage.getContext('2d');
    videoImageContext.fillStyle = '#000000';
    videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

    //生成したcanvasをtextureとしてTHREE.Textureオブジェクトを生成
    var videoTexture = new THREE.Texture(videoImage);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    //生成したvideo textureをmapに指定し、overdrawをtureにしてマテリアルを生成
    var movieMaterial = new THREE.MeshBasicMaterial({ map: videoTexture, overdraw: true, side: THREE.DoubleSide });
    var movieGeometry = new THREE.PlaneGeometry(10, 10, 4, 4);
    var movieScreen = new THREE.Mesh(movieGeometry, movieMaterial);
    movieScreen.rotation.y = THREE.Math.degToRad(90);

    const scene = new THREE.Scene();
    scene.add(movieScreen);

    //loop updateの中で実行
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        videoImageContext.drawImage(video, 0, 0);
        if (videoTexture) {
            videoTexture.needsUpdate = true;
        }
    }
}

export default { tv }
