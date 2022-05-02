$(document).ready(function () {
  $(".options, p").css("visibility", "hidden");
  $("td").css("visibility", "visible");
  aiCo = "#333";
  huCo = "white";

  $("td").click(function () {
    // vị trí, lượt đánh và màu
    if (currentPlay === huPlayer) {
      console.log("clicked", this, currentPlay, huCo);
      win && move(this, currentPlay, huCo);
    } else {
      console.log("clicked", this, currentPlay, aiCo);
      win && move(this, currentPlay, aiCo);
    }
  });
  $("#button").click(function () {
    reset();
    $("#button").css("display", "none");
    $("#nofi").css("display", "none");
  });
  $("#audio").click(function () {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      $("#audio").html(`<i class="fas fa-volume-mute"></i> `);
    } else {
      isPlaying = true;
      audio.play();
      $("#audio").html(`<i class="fas fa-volume-up" ></i>`);
    }
  });
});
var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var huPlayer = "P";
var aiPlayer = "C";
var iter = 0;
var round = 0;
var aiCo = "white";
var huCo = "#333";
var currentPlay = huPlayer;
let win = true;
var audio = new Audio("./Assets/Audio/autido.mp3");
let isPlaying = false;

$("#audio").html(`<i class="fas fa-volume-up" ></i>`);

function move(element, player, color) {
  console.log("element" + element.id + currentPlay);

  if (board[element.id] != "P" && board[element.id] != "C") {
    round++;
    $(element).css("background-color", color);
    board[element.id] = player;
    console.log(board);

    if (winning(board, player)) {
      setTimeout(function () {
        if (player === huPlayer) {
          $("#nofi").html("Người chơi dùng quân trắng chiến thắng!");
        } else {
          $("#nofi").html("Người chơi dùng quân đen chiến thắng!");
        }
        $("#button").css("display", "block");
        $("#nofi").css("display", "block");
        audio.play();
        win = false;
      }, 500);
      return;
    } else if (round > 8) {
      setTimeout(function () {
        $("#nofi").html("Hòa nhau");
        $("#button").css("display", "block");
        $("#nofi").css("display", "block");
        audio.play();
        win = false;
      }, 500);
      return;
    } else {
      console.log("currentPlay", currentPlay);
      if (currentPlay === huPlayer) {
        currentPlay = aiPlayer;
      } else {
        currentPlay = huPlayer;
      }
    }
  }
}

function reset() {
  win = true;
  isPlaying = true;
  audio.pause();
  audio.currentTime = 0;
  round = 0;
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  $("td").css("background-color", "transparent");
}

//available spots
function avail(reboard) {
  return reboard.filter((s) => s != "P" && s != "C");
}

// winning combinations
function winning(board, player) {
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {
    return true;
  } else {
    return false;
  }
}
