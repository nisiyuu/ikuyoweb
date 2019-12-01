<template>
<div class="z1 shopwrap">
<canvas id="canvas" style="width:2000px;height:2000px"></canvas>
</div>
</template>


<script>
import * as THREE from "three";

export default {
	data() {
    const scene = new THREE.Scene();
    const renderer = null;
    const camera = new THREE.PerspectiveCamera(90, 500 / 250, 0.1, 1000);
    const w = window.innerWidth;
    const h = window.innerHeight;
    // const geometry = new THREE.BoxGeometry(300, 300, 300);
    const geometry = new THREE.SphereGeometry(80);
    const material = new THREE.MeshPhongMaterial();
    const cube = new THREE.Mesh(geometry, material);
    const light = new THREE.DirectionalLight(100000);
    const mouse = new THREE.Vector2(0, 0);
    return { scene, renderer, camera, geometry, material, cube,light, w, h, mouse };
  },
  mounted() {
    const $canvas = document.getElementById("canvas");
    const container = document.getElementById('wrap');
    // canvasを後付けで設定する方法あったら教えてほしいー
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: $canvas,
      alpha: true
    });

    const fov    = 60;
    const fovRad = (fov / 2) * (Math.PI / 180);// 視野角をラジアンに変換
    const dist   = (this.h / 2) / Math.tan(fovRad);// ウィンドウぴったりのカメラ距離
     // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    this.camera = new THREE.PerspectiveCamera(fov, this.w / this.h, 1, dist * 2);
    this.camera.position.z = dist;// カメラを遠ざける
    
    this.cube.position.set(-150, 200, 0);
    this.light.position.set(0, 0, 50);
    this.scene.add(this.cube);
    this.scene.add(this.light);
    this.animate();
    window.addEventListener('mousemove', e => {
      this.mouseMoved(e.clientX, e.clientY);
      this.material = new THREE.MeshPhongMaterial({color: 0xff0000});//動かない
    });
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate);
      this.cube.position.x += 0.01;
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
    },
      mouseMoved(x, y) {
      this.mouse.x =  x - (this.w / 2);// 原点を中心に持ってくる
      this.mouse.y = -y + (this.h / 2);// 軸を反転して原点を中心に持ってくる
      // ライトの xy座標 をマウス位置にする
      this.light.position.x = this.mouse.x;
      this.light.position.y = this.mouse.y;
    },

  }
}
</script>
<style>
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
  width: 100%;
}

#wrap {
  height: 100%;
  width: 100%;
}

#canvas {
  display: block;
}

.shopwrap{
  margin: 0;
  padding: 0;
  background-color:white;
  animation: shopflash .1s infinite,shopskew 6s infinite;
  /* margin-top: 120px; */
  /* background-image: url("../assets/sweat.png");
  background-size: 400%; */
/* グリッチhttps://hirashimatakumi.com/blog/6303.html */
}
@keyframes shopflash {
  0% {
    opacity: 1;
    background: white;
  }
  100% {
    opacity: .8;
    background: rgb(173, 170, 170);
  }
}

@keyframes shopskew {
  0% {
    transform: none;
  }
  33% {
    transform: none;
  }
  33.3% {
    transform: skewX(30deg);
  }
  33.6% {
    transform: skewX(-30deg);
  }
  33.9% {
    transform: none;
  }
  66% {
    transform: none;
  }
  66.3% {
    transform: skewX(5deg);
  }
  66.6% {
    transform: skewX(-5deg);
  }
  66.9% {
    transform: none;
  }
  77% {
    transform: none;
  }
  77.3% {
    transform: skewX(15deg);
  }
  77.6% {
    transform: skewX(-15deg);
  }
  77.9% {
    transform: none;
  }
}

@keyframes shopglitch {
  0% {
    transform: translate(0);
  }
  12.5% {
    transform: translate(-1px, 1px);
  }
  37.5% {
    transform: translate(-1px, -1px);
  }
  62.5% {
    transform: translate(1px, 1px);
  }
  87.5% {
    transform: translate(1px, -1px);
  }
  100% {
    transform: translate(0);
  }
}


</style>

https://qiita.com/kokorau/items/1c8ba182699b3646b363


