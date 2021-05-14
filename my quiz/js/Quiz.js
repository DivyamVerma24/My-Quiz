class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("yellow");
    textSize(40);
    fill("red");
    text("Result Of The Quiz",280,50);
    
    Contestant.getContestantInfo();

    if(allContestants !== undefined) {
      textSize(20);
    fill("blue");
    text("NOTE : contestant who answer correct are highlighted in green color!",130,230);
    
    for(var plr in allContestants) {
      var correctAnswer = "2";
      if(correctAnswer===allContestants[plr].answer) {
        fill("green");
          text(allContestants[plr].name +":"+allContestants[plr].answer,200,300);
      }
      else {
        fill("red");
          text(allContestants[plr].name +":"+allContestants[plr].answer,200,350);
      }
    }
  }
    
  }

}
