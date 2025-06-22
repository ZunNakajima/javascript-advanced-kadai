// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;//スコアカウント用

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

// ランダムなテキストを表示する関数を定義
const createText = () => {

  // タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;

  //配列のインデックス数からランダムな整数を生成する
  let random = Math.floor(Math.random() * textLists.length);

  //配列からランダムにテキストを取得し、画面に表示する
  untyped = textLists[random];
  //この下の行はオリジナル要素
  // console.log('Index number of the text to display:' + random);
  untypedfield.textContent = untyped;
};

// キーの入力判定する関数を定義
const keyPress = e => { //引数が一つの時は()を省略可能
  
  //誤タイプの場合
  if (e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');//クラス「mistyped」を追加
    //100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100)
    return;
  }
  
  //正タイプの場合
  score ++;//スコアのインクリメント
  //クラス「mistyped」を削除
  wrap.classList.remove('mistyped');
  typed += untyped.substring(0,1);//先頭の文字を代入
  untyped = untyped.substring(1);//2文字目以降を代入
  typedfield.textContent = typed;//htmlに代入
  untypedfield.textContent = untyped;//htmlに代入
  //この行はオリジナル
  console.log(typed + ':' + untyped);

  // テキストが0文字になったら、新しいテキストを表示
  if (untyped === '') {
    createText();
  }
};

// タイピングスキルのランクを判定する関数を定義
const rankCheck = score => {//引数が一つの時は()を省略可能
  // 終了メッセージを格納する変数を作る
  let text = '';
  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100){
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if (score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if (score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else if (score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます！`;
  }
  //スコアのメッセージを返す
  return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了する関数を定義
const gameOver = id => {//引数が一つの時は()を省略可能
  clearInterval(id);//タイマーを終了させる
  // console.log('ゲーム終了！');
  // 終了メッセージを表示する
  const result = confirm(rankCheck(score));
  // OKボタンがクリックされたらリロードする
  if( result == true) {
    window.location.reload();
  }
};

// カウントダウンタイマーの関数を定義
const timer = () => {
  // タイマー部分のHTML要素を取得する。
  let time = count.textContent;

  const id = setInterval(() => {
    // カウントダウンする
    time --;//1減らす
    count.textContent = time;

    if (time <= 0){
      gameOver(id)
    }
  }, 1000);//1000ミリ秒ごとに
};



//スタートボタンを押したときの処理
start.addEventListener('click', () => {
  //タイマーを開始する
  timer();
  // ランダムなテキストを表示する関数を実行
  createText();
  // スタートボタンを非表示にする
  start.style.display = 'none';
  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';