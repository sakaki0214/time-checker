$(function(){
  'use strict';

  var $list = $('.project-list');
  var $input = $('.btn-add .tx-project');
  var $projectName = $('.btn-add .tx-project');

  var $this = $(this);

  //ページを読み込んだ時にフォーカスが入力フォームにあたるように
  $(window).on('load', function(){
    $projectName.focus();
  });

  //プロジェクトを追加する関数
  function addProject(text) {

    //project itemを作成
    var $li = $('<li class="item">');
    var $text = $('<span class="project-name">').text(text);
    var $text2 = $('<span class="project-time">').text('00:00:00');
    var $textHidden = $('<span class="project-time-hidden">').text('1');
    var $btnStart = $('<a href="#" class="btn-start">').append('<i class="fa fa-play" aria-hidden="true"></i>START');
    var $btnStop = $('<a href="#" class="btn-stop">').append('<i class="fa fa-stop" aria-hidden="true"></i>STOP');
    var $btnDelete = $('<a href="#" class="btn-delete">').append('<i class="fa fa-times" aria-hidden="true"></i>DELETE');
    $li.append($text).append($text2).append($textHidden).append($btnStart).append($btnStop).append($btnDelete);

    //ulに追加
    $list.append($li);

    $list.find('li').each(function(i){
      $(this).attr('id', 'sw' + (i+1));
    });
  }

  //フォームを送信した時の処理
  $('form').on('submit', function(event){
    event.preventDefault();

    //テキストボックスに入っている文字列を取得
    var text = $input.val();

    //todoを追加
    addProject(text);

    $input.val('');
    $projectName.focus();
  });
  //

  //クラス作成＆コンストラクタ
  var WorkTimer = function(_itemId){
    var self = this;

    this.ulParent = '.project-list';
    this.continerSelecter = '#'+_itemId;
    this.startBtnSelecter = '.btn-start';
    this.stopBtnSelecter = '.btn-stop';
    this.resetBtnSelecter = '.btn-reset';
    this.timerTextSelecter = '.project-time';
    this.timerTextSelecterHidden = '.project-time-hidden';
    this.intervalId = null;

    //クリックイベント登録
    $(this.ulParent+'>'+this.continerSelecter+'>'+this.startBtnSelecter).click(function(e){
      e.preventDefault();
      self.start();
    });
    $(this.continerSelecter+'>'+this.stopBtnSelecter).click(function(e){
      e.preventDefault();
      self.stop();
    });

    // $(this.continerSelecter+'>'+this.resetBtnSelecter).click(function(e){
    //   e.preventDefault();
    //   self.reset();
    // });
  };

  //各function
  WorkTimer.prototype.start = function(){
    this.run();
  };
  WorkTimer.prototype.stop = function(){
    if(this.intervalId !== null){
        clearInterval(this.intervalId);
        this.intervalId = null; // add
    }
  };

  WorkTimer.prototype.run = function(){
    var self = this;
    if (this.intervalId != null) {
      return;
    }
    this.intervalId = setInterval(function(){

        //動くコード
        var passedTime = $(self.continerSelecter+'>'+self.timerTextSelecterHidden).text();

        var seconds = passedTime % 60;
        var minutes = Math.floor(passedTime / 60) % 60;
        var hours = Math.floor(passedTime / 3600);

        function zeroFill(num) {
          return ('0' + num).slice(-2);
        }

        var displayTime = zeroFill(hours) + ':' + zeroFill(minutes) + ':' + zeroFill(seconds)
        $(self.continerSelecter+'>'+self.timerTextSelecter).text(displayTime);

        $(self.continerSelecter+'>'+self.timerTextSelecterHidden).text(parseInt(passedTime,10)+1);
    }, 1000);
  };

  // main処理
    $('form').on('submit', function(){
      main();
    });

    var liCount = 0;
    function main(){
      liCount++;
      var sw = 'sw' + liCount;
      var sw = new WorkTimer(sw);
    }

  //各DELETEボタンを押した時の処理
  $('.project-list').on('click', '.btn-delete',  function(){
    $(this).parent('li').hide();
    return false;
  });

  //ALL DELETEボタンを押した時の処理
  $('.btn-all-delete').click(function(e){
    e.preventDefault();
    $('.project-list li').hide();
  });

});
