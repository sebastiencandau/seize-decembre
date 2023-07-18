import * as chapterOne from './chapterOne.utils';


export const narativeIndicationsForChapter = (chapterNumber) => {
    if(chapterNumber === 1){
        return chapterOne.narativeIndications;
    } else {
        return chapterOne.narativeIndications
    }
}