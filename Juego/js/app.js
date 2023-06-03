function initCanvas() {
  var ctx = document.getElementById("my_canvas").getContext("2d");
  var backgroundImage = new Image();
  var naveImage = new Image(); //nave
  var enemiespic1 = new Image(); //nave mala 1
  var enemiespic2 = new Image(); //enemiga nave 2
  let counter=0;
  // BACKGROUND Y NAVEIMAGE

  // backgroundimage.src="./img/background-pig.jpg";
  // naveimage.src="./img/spaceship-pic";

  backgroundImage.src = "/img/fondo2.jpeg";
  naveImage.src = "/img/nave3.jpeg";

  //naves enemigas
  enemiespic1.src = "/img/nave1.jpeg";
  enemiespic2.src = "/img/nave2.jpeg";

  //ALTO Y ANCHO DEL LIENZO
  var cW = ctx.canvas.width; //700px
  var cH = ctx.canvas.height; //600px

  //base para las naves
  var enemyTemplate = function (options) {
    return {
      id: options.id || "",
      x: options.x || "",
      y: options.y || "",
      w: options.w || "",
      h: options.h || "",
      image: options.image
    };
  };

  let enemies = [
    new enemyTemplate({ 
      id: "enemy1",
      x: 0, y: -20,
      w: 50, 
      h: 30,
      image:enemiespic1 }),
    new enemyTemplate({ 
      id: "enemy2",
      x: 205, y: -20, 
      w: 50,
      h: 30,
      image:enemiespic1 }),
    new enemyTemplate({ 
      id: "enemy3", 
      x: 350, y: -20,
      w: 50,
      h: 30,
      image:enemiespic1 }),
    new enemyTemplate({ 
      id: "enemy4", 
      x: 100, y: -70,
      w: 50,
      h: 30,
      image:enemiespic1}),
    new enemyTemplate({
      id: "enemy5",
      x: 225,
      y: -70,
      w: 50,
      h: 30,
      image:enemiespic1 }),
    new enemyTemplate({
      id: "enemy6",
      x: 350, y: -70,
      w: 50,
      h: 30,
      image:enemiespic1 }),
    new enemyTemplate({
      id: "enemy7",
      x: 475,
      y: -70,
      w: 50, h: 30,
      image:enemiespic1 }),
    new enemyTemplate({
      id: "enemy8",
      x: 600,
      y: -70,
      w: 50,
      h: 30,
      image:enemiespic1}),
    new enemyTemplate({
      id: "enemy9",
      x: 475,
      y: -20,
      w: 50,
      h: 30,
      image:enemiespic1  }),
    new enemyTemplate({
      id: "enemy10",
      x: 600,
      y: -20,
      w: 50,
      h: 30,
      image:enemiespic1 }),
    // Segundo grupo de enemigos
    new enemyTemplate({
      id: "enemy11",
      x: 100,
      y: -220,
      w: 50,
      h: 30,
      image:enemiespic2
    }),
    new enemyTemplate({
      id: "enemy12",
      x: 225,
      y: -220,
      w: 50,
      h: 30,
      image:enemiespic2
    }),
    new enemyTemplate({
      id: "enemy13",
      x: 350,
      y: -220,
      w: 100,
      h: 50,
      image:enemiespic2
    }),
    new enemyTemplate({
      id: "enemy14",
      x: 100,
      y: -270,
      w: 80,
      h: 50,
      image:enemiespic2
    }),
    new enemyTemplate({
      id: "enemy15",
      x: 225,
      y: -250,
      w: 50,
      h: 30,
      image:enemiespic2
    }),
    new enemyTemplate({
      id: "enemy16",
      x: 350,
      y: -270,
      w: 50,
      h: 30,
      image:enemiespic2
    }),
    new enemyTemplate({
      id: "enemy17",
      x: 475,
      y: -270,
      w: 50,
      h: 30,
      image:enemiespic2
    }),
    new enemyTemplate({
      id: "enemy18",
      x: 600,
      y: -270,
      w: 80,
      h: 50,
      image:enemiespic2
    }),
    new enemyTemplate({
      id: "enemy19",
      x: 475,
      y: -200,
      w: 50,
      h: 30,
      image:enemiespic2
    }),
    new enemyTemplate({
      id: "enemy20",
      x: 600,
      y: -200,
      w: 50,
      h: 30,
      image:enemiespic2
    }),
  ];

  let renderEnemies = function (enemyList) {
    for (let i = 0; i < enemyList.length; i++) {
      // console.log(enemyList[i]);
      ctx.drawImage(
        enemyList[i].image,
        enemyList[i].x,
        (enemyList[i].y += .5),
        enemyList[i].w,
        enemyList[i].h
      );
      launch.hitDetectLowerLevel(enemyList[i]);
    }
  };
  function launcher() {
    // Ubicacion de balas
      (this.y = 500), 
      (this.x = cW * .5 - 25),
      (this.w = 100),
      (this.h = 100),
      this.direccion,
      (this.bg = "white"), //Bullet color
      (this.misiles = []);

    this.gameStatus = {
      over: false,
      message: "",
      fillStyle: "red",
      font: "Italic bold 36px Arial, sans-serif",
    };

    this.render = function () {
      if (this.direccion === "left") {
        this.x -= 5;
      } else if (this.direccion === "right") {
        this.x += 5;
      } else if (this.direccion === "downArrow") {
        this.y += 5;
      } else if (this.direccion === "upArrow") {
        this.y -= 5;
      }
      ctx.fillStyle = this.bg;
      ctx.drawImage(backgroundImage, 10, 10);
      ctx.drawImage(naveImage, this.x, this.y, 100, 90);

      for (let i = 0; i < this.misiles.length; i++) {
        let m = this.misiles[i];
        ctx.fillRect(m.x, (m.y -= 5), m.w, m.h);
        this.hitDetect(this.misiles[i], i);
        if (m.y <= 0) {
          this.misiles.splice(i, 1);
        }
      }
      // Caso en que el jugador gane el juego
      if (enemies.length == 0) {
        // console.log("Has ganado.")
        // clearInterval(animateInterval);
        // ctx.fillStyle = "yellow";
        // ctx.font = this.gameStatus.font;
        // ctx.fillText("Tú ganas", cW * 5 - 80, 50);
        clearInterval(animateInterval);
        ctx.fillStyle ="yellow";
        ctx.font = this.gameStatus.font;
        ctx.fillText("Has ganado.", cW * 0.5 - 100, 50);
      }
    }
      // Detectar impacto de balas
      this.hitDetect = function (m, mi) {
        console.log("crush");

        for (let i = 0; i < enemies.length; i++) {
          let e = enemies[i];
          if (
            m.x + m.w >= e.x &&
            m.x <= e.x + e.w &&
            m.y >= e.y &&
            m.y <= e.y + e.h
          ){
            this.misiles.splice(this.misiles[mi], 1); //Mueve los misiles
            enemies.splice(i, 1); //Remueve los enemigos impactados por los misiles
            counter++;
            document.querySelector(".barra").innerHTML = "Destroyed " + counter + "";
          }
        }
      };
      this.hitDetectLowerLevel = function(enemy){
        if (enemy.y > 550) {
          this.gameStatus.over = true;
          this.gameStatus.message = "Los enemigos han llegado!";
        }
        if (enemy.id === "enemy3") {
          // console.log(this.x);
        }
        if (
          enemy.y < this.y + 25 &&
          enemy.y > this.y - 25 &&
          enemy.x < this.x + 45 &&
          enemy.x > this.x - 45
        ) {
          this.gameStatus.over = true;
          this.gameStatus.message = "Se acabó el juego.";
        }
        if (this.gameStatus.over) {
          clearInterval(animateInterval);
          ctx.fillStyle = this.gameStatus.fillStyle;
          ctx.font = this.gameStatus.font;
          ctx.fillText(this.gameStatus.message, cW * 0.5 - 150, 50);
        }
      }
    }
// ----------------------------------------------------------------
    let launch = new launcher();
    function animate() {
    ctx.clearRect(0, 0, cW, cH);
    launch.render();
    renderEnemies(enemies);
  }
  let animateInterval = setInterval(animate, 6);

  let left_btn = document.getElementById("left_btn");
  let right_btn = document.getElementById("right_btn");
  let fire_btn = document.getElementById("fire_btn");

  document.addEventListener("keydown", function (e) {
    if (e.keyCode == 37) {
      launch.direccion = "left";
      if (launch.x < cW * 0.2 - 130) {
        launch.x += 0;
        launch.direccion = "";
      }
    }
  });
  document.addEventListener("keyup", function (e) {
    if (e.keyCode == 37) {
      launch.x += 0;
      // ! Recuerda: puede ser launch.direccion="";
      launch.direccion = "";
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.keyCode == 39) {
      launch.direccion = "right";
      if (launch.x > cW - 100) {
        launch.x -= 0;
        launch.direccion = "";
      }
    }
  });
  document.addEventListener("keyup", function (e) {
    if (e.keyCode == 39) {
      launch.x -= 0;
      launch.direccion = "";
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.keyCode == 38) {
      launch.direccion = "upArrow";
      if (launch.y < cH * 0.2 - 80) {
        launch.y += 0;
        launch.direccion = "";
      }
    }
  });
  document.addEventListener("keyup", function (e) {
    if (e.keyCode == 38) {
      launch.y -= 0;
      launch.direccion = "";
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.keyCode == 40) {
      launch.direccion = "downArrow";
      if (launch.y > cH - 100) {
        launch.y -= 0;
        launch.direccion = "";
      }
    }
  });
  document.addEventListener("keyup", function (e) {
    if (e.keyCode == 40) {
      launch.y -= 0;
      launch.direccion = "";
    }
  });
  document.addEventListener("keydown", function(e){
   //   * keyCode == 80 -> Tecla P
   if(e.keyCode==80){//Reiniciar el juego
      this.location.reload();
      }
  });
  // Control de botones
  left_btn.addEventListener('mousedown', function(e){
    launch.direccion="left";
  });
  left_btn.addEventListener("mouseup", function(e){
    launch.direccion="";
  });
  right_btn.addEventListener("mousedown", function(e){
    launch.direccion="right";
  });
  right_btn.addEventListener("mouseup", function(e){
    launch.direccion="";
  });
  // Balas
  fire_btn.addEventListener("mousedown", function(e){
    launch.misiles.push({x:launch.x+launch.w*0.5, y:launch.y, w:3, h:10});
  });
  document.addEventListener("keydown", function(e){
    if(e.keyCode==32){
      launch.misiles.push({x:launch.x + launch.w*.5, y:launch.y, w:3, h:10});
    }
  });
}
window.addEventListener('load', function(e){
  initCanvas();
});
