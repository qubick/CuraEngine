function main() {

  //parameters
  var returnedZ = 5; //assume this is returned from the printer queue
  var locationX = 2; //assume these are returned by localization
  var locationY = 3;
  var rotationX = 30;
  var rotationY = 60;

  //inputs
  var original = CSG.cube({radius:10}); //the original model
  var inserted = CSG.sphere({radius:3}).translate([0,0,returnedZ]);
  var cutPlane = CSG.Plane.fromNormalAndPoint([0,0,1],[0,0,returnedZ]);

  //segment model in two parts
  var partLower = original.cutByPlane(cutPlane); //already printed
  var partUpper = original.cutByPlane(cutPlane.flipped()); //not yet printed

  //localize the inserted mesh
  inserted.translate([locationX, locationY, 0])
          .rotateX(rotationX)
          .rotateY(rotationY); //do we want to care z-rotation for insertion?

  //upperPart geometry adjustment
  var newGeometry = partUpper.subtract(inserted);

  //geometry operations for further intervention
  // 1. ensure space to avoid collision with extruder
  // 2. define printable surface, etc.
  // ...

  return union(newGeometry,
                original.translate([30,0,0])
              ); //now this new geometry needs to be sliced at 'current' z-height
}
