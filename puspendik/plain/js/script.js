$(function(){
// var cy = cytoscape({

//   container: document.getElementById('canvas'), // container to render in

//   elements: [ // list of graph elements to start with
//     { // node a
//       data: { id: 'a',class: 'node' }
//     },
//     { // node b
//       data: { id: 'b',class: 'node' }
//     },
//     { // edge ab
//       data: { id: 'ab', source: 'a', target: 'b' }
//     },
//     { // node a
//       data: { id: 'c',class: 'node' }
//     },
//     { // node b
//       data: { id: 'd',class: 'node' }
//     },
//     { // node a
//       data: { id: 'e',class: 'node' }
//     },
//     { // node b
//       data: { id: 'f',class: 'node' }
//     }
//   ],

//   style: [ // the stylesheet for the graph
//     {
//       selector: 'node',
//       style: {
//         'background-color': '#666',
//         'label': 'data(id)'
//       }
//     },

//     {
//       selector: 'edge',
//       style: {
//         'width': 3,
//         'line-color': '#ccc',
//         'target-arrow-color': '#ccc',
//         'target-arrow-shape': 'triangle'
//       }
//     }
//   ],

//   layout: {
//     name: 'grid',
//     cols: 2
//   },

//   zoomingEnabled: false,
//   userZoomingEnabled: false,
//   autoungrabify: true,
//   panningEnabled: false,
//   userPanningEnabled: false,

// });

// // cy.center();
// // cy.('.node').on('click',function(evt){
// //     console.log(this.id());
// // });
// // cy.on('click', 'node', function(evt){ 
// //     console.log( 'clicked ' + this.id() ); 
// //     var fromId = this.id();
// //     cy.on('click',function(evt){
// //         var toId = this.id();
// //             cy.add([
// //             { group: "edges", data: { id: fromId+toId, source: fromId, target: toId}}
// //         ]);
// //     });
// // });

// // cy.ungrabify();

// // the default values of each option are outlined below:
// var defaults = {
//   preview: true, // whether to show added edges preview before releasing selection
//   stackOrder: 4, // Controls stack order of edgehandles canvas element by setting it's z-index
//   handleSize: 10, // the size of the edge handle put on nodes
//   handleColor: '#ff0000', // the colour of the handle and the line drawn from it
//   handleLineType: 'ghost', // can be 'ghost' for real edge, 'straight' for a straight line, or 'draw' for a draw-as-you-go line
//   handleLineWidth: 1, // width of handle line in pixels
//   handleIcon: false, // Pass an Image-object to use as icon on handle. Icons are resized according to zoom and centered in handle.
//   handleOutlineColor: '#000000', // the colour of the handle outline
//   handleOutlineWidth: 0, // the width of the handle outline in pixels
//   handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
//   handlePosition: 'middle top', // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
//   hoverDelay: 150, // time spend over a target node before it is considered a target selection
//   cxt: false, // whether cxt events trigger edgehandles (useful on touch)
//   enabled: true, // whether to start the extension in the enabled state
//   toggleOffOnLeave: false, // whether an edge is cancelled by leaving a node (true), or whether you need to go over again to cancel (false; allows multiple edges in one pass)
//   edgeType: function( sourceNode, targetNode ) {
//     // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
//     // returning null/undefined means an edge can't be added between the two nodes
//     return 'flat';
//   },
//   loopAllowed: function( node ) {
//     // for the specified node, return whether edges from itself to itself are allowed
//     return false;
//   },
//   nodeLoopOffset: -50, // offset for edgeType: 'node' loops
//   nodeParams: function( sourceNode, targetNode ) {
//     // for edges between the specified source and target
//     // return element object to be passed to cy.add() for intermediary node
//     return {};
//   },
//   edgeParams: function( sourceNode, targetNode, i ) {
//     // for edges between the specified source and target
//     // return element object to be passed to cy.add() for edge
//     // NB: i indicates edge index in case of edgeType: 'node'
//     return {};
//   },
//   start: function( sourceNode ) {
//     // fired when edgehandles interaction starts (drag on handle)
//   },
//   complete: function( sourceNode, targetNodes, addedEntities ) {
//     // fired when edgehandles is done and entities are added
//   },
//   stop: function( sourceNode ) {
//     // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
//   }, 
//   cancel: function( sourceNode, renderedPosition ){
//     // fired when edgehandles are cancelled ( incomplete - nothing has been added ) - renderedPosition is where the edgehandle was released
//   }
// };

// cy.edgehandles( defaults );

// console.log(cy);

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = $('.match-container').width();
console.log(canvas.width);
canvas.height = $('.match-container').height();
console.log(canvas.height);
ctx.lineWidth = 3;

var $canvas = $("#canvas");
var canvasOffset = $canvas.offset();
console.log(canvasOffset);
var offsetX = canvasOffset.left;
console.log('Canvas Offset X: '+offsetX);
var offsetY = canvasOffset.top;
console.log('Canvas Offset Y: '+offsetY);


var $0 = $("#0");
var $1 = $("#1");
var $2 = $("#2");
var $0r = $("#0r");
var $1r = $("#1r");
var $2r = $("#2r");

var connectors = [];
connectors.push({
    from: $0,
    to: $0r
});
connectors.push({
    from: $1,
    to: $2r
});
connectors.push({
    from: $2,
    to: $1r
});

connect();

function connect() {
    for (var i = 0; i < connectors.length; i++) {
        var c = connectors[i];
        var eFrom = c.from;
        var eTo = c.to;
        var pos1 = eFrom.offset();
        console.log(pos1);
        var pos2 = eTo.offset();
        console.log(pos2);

        var size1 = eFrom.size();
        console.log(i+' line from top: '+pos1.top);

        var size2 = eTo.size();
        console.log(i+' line to top: '+pos1.top);

        ctx.beginPath();
        ctx.moveTo(pos1.left + eFrom.width()-106, (pos1.top + eFrom.height()/2));
        ctx.lineTo(pos2.left-116, (pos2.top + eTo.height()/2));
        ctx.stroke();

    }
}
});
