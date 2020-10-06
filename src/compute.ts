import { Game } from "./types";

export function compute(game: Game): number {

    let sum = 0;
    let count_all_strikes = 0;
    let count_first_elem_of_arrays = 0;
    let temp_sum_for_spare = 0;
    //let count = 0;
    for(let i = 0; i<game.length; i++){
      for(let t = 0; t < game[i].length; t++){
        //if it's the very first element inside every array, count it
        if(t == 0){
          count_first_elem_of_arrays++;
        }
        //if it's the second element inside the array
        if(t == 1){
          //sum them up and if it equals 10, it's a spare
          temp_sum_for_spare = game[i][0] + game[i][1];
          if(temp_sum_for_spare == 10){
              //if not last index
              if(i != game.length - 1){
                //since it's a spare, add next frame's score.
                sum += game[i+1][0];
                
                //count++;
              }
          }
        }
        //sum up the score, normally.
        sum += game[i][t];
        }
          //if the first throw is a strike, count it
          if(game[i][0] == 10){
          count_all_strikes++;
        }
      }
        //check if the stike's count equals the count of all first elems inside the array, if it is => full score.
        if(count_all_strikes == count_first_elem_of_arrays){
          sum = 300;
      }
      
      return sum;
  
}
