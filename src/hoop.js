export default class Hoop {
  constructor(dimensions) {}

    

  collidesWith(ball) {
    // this function returns true if the the rectangles overlap
    // console.log("this.collidesWith");
    const _overlap = (platform, object) => {
    //   console.log("_overlap");
      //check that they don't overlap in the x axis
      const objLeftOnPlat =
        object.left <= platform.right && object.left >= platform.left;
      const objRightOnPlat =
        object.right <= platform.right && object.right >= platform.left;

    //   console.log(object);
    //   console.log(platform);
      if (!objLeftOnPlat && !objRightOnPlat) {
        return false;
        // if (object.bottom < platform.top) return true;
        // return false;
      }
      //check that they don't overlap in the y axis
      const objTopAbovePlatBot = object.top > platform.bottom;
      const objBotOnPlatTop = object.bottom === platform.top;
      if (!objBotOnPlatTop) {
        return false;
      }

      return true;
    };

    let collision = false;
    this.eachPlatform((platform) => {
      //check if the bird is overlapping (colliding) with either platform
      if (_overlap(platform, ball)) {
        collision = true;
        // console.log(platform);
        // console.log(collision);
      }
      // _overlap(platform.bottomPlatform, ball)
    });

    // console.log("collision:");
    // console.log(collision);
    return collision;
  }
}