$(document).ready(function () {
  $(".options, p").css("visibility", "hidden");
  $("td").css("visibility", "visible");
  aiCo = "#333";
  huCo = "white";

  $("td").click(function () {
    // vị trí, lượt đánh và màu
    console.log("win", win);
    win && move(this, huPlayer, huCo);
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
$("#audio").html(`<i class="fas fa-volume-up" ></i>`);

var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var huPlayer = "P";
var aiPlayer = "C";
var iter = 0;
var round = 0;
var aiCo = "white";
var huCo = "#333";
let win = true;
var audio = new Audio("./Assets/Audio/autido.mp3");
let isPlaying = false;

function move(element, player, color) {
  if (board[element.id] != "P" && board[element.id] != "C") {
    round++;
    $(element).css("background-color", color);
    board[element.id] = player;
    console.log(board);

    if (winning(board, player)) {
      setTimeout(function () {
        $("#nofi").html("Chúc mừng bạn đã chiến thắng!");
        $("#button").css("display", "block");
        $("#nofi").css("display", "block");
        audio.play();
        win = false;
      }, 500);
      return;
    } else if (round > 8) {
      setTimeout(function () {
        $("#nofi").html("Hòa nhau!");
        $("#button").css("display", "block");
        $("#nofi").css("display", "block");
        audio.play();
        win = false;
      }, 500);
      return;
    } else {
      round++;
      var index = minimax(board, aiPlayer).index;
      var selector = "#" + index;
      $(selector).css("background-color", aiCo);
      board[index] = aiPlayer;
      if (winning(board, aiPlayer)) {
        setTimeout(function () {
          $("#nofi").html("Thất bại!");
          $("#button").css("display", "block");
          $("#nofi").css("display", "block");
          win = false;
          audio.play();
        }, 500);
        return;
      } else if (round === 0) {
        setTimeout(function () {
          $("#nofi").html("Hòa nhau!");
          $("#button").css("display", "block");
          $("#nofi").css("display", "block");
          audio.play();
          win = false;
        }, 500);
        return;
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

function minimax(reboard, player) {
  iter++;
  let array = avail(reboard);
  if (winning(reboard, huPlayer)) {
    return {
      score: -10,
    };
  } else if (winning(reboard, aiPlayer)) {
    return {
      score: 10,
    };
  } else if (array.length === 0) {
    return {
      score: 0,
    };
  }

  var moves = [];
  for (var i = 0; i < array.length; i++) {
    var move = {};
    move.index = reboard[array[i]];
    reboard[array[i]] = player;

    if (player == aiPlayer) {
      var g = minimax(reboard, huPlayer);
      move.score = g.score;
    } else {
      var g = minimax(reboard, aiPlayer);
      move.score = g.score;
    }
    reboard[array[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
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
