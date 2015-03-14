/*-------------------------------------------------------------------------------------------------
	global variables
-------------------------------------------------------------------------------------------------*/

var packed_clothing = [[],[],[]];
var packed_big3		= [[],[],[]];
var packed_kitchen	= [[],[],[]];
var packed_health	= [[],[],[]];
var packed_other	= [[],[],[]];

var all_pack_items	= [[],[],[]];


/*-------------------------------------------------------------------------------------------------
	tab function
-------------------------------------------------------------------------------------------------*/

$(function() {
	$( "#tabs" ).tabs();
});


/*-------------------------------------------------------------------------------------------------
	accordion function
-------------------------------------------------------------------------------------------------*/

$(function() {
	$( "#accordion" ).accordion({
	  collapsible: true,
	  heightStyle: "content",
	  icons: false
	});
});

/*-------------------------------------------------------------------------------------------------
	add item button maybe for p4, nothing really going on here yet.
-------------------------------------------------------------------------------------------------*/

/*function addItem(thing_to_add){


};

$('#add_item').click(function(e){
    e.stopPropagation();
	console.log('clickiddy do dah');
	$( ".new_item" ).toggle();
});

$( ".new_item" ).change(function() { 
	console.log("input happened");
	var id = $(this).attr('id'); 
	console.log(id);
    //$("#all_pack_items > tbody").append("<tr><td>"+item_name+"</td><td>"+item_category+"</td><td>"+item_weight+"</td></tr>");
   // addItem(thing_to_add);

});*/


/*-------------------------------------------------------------------------------------------------
	dataTables function
-------------------------------------------------------------------------------------------------*/

$(document).ready(function() {
	$('#all_pack_items').dataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        "bAutoWidth": false,
        "aaSorting": [[ 2, "desc" ]]
	});
} );

/*-------------------------------------------------------------------------------------------------
	unit change function
-------------------------------------------------------------------------------------------------*/


//not happy with my logic here, must make simpler!

var chosen_unit = "oz";
	$('#ounces').css('background-color','white');
	$('#ounces').css('color','#0e83cd');


function converter(clothingTotal,big3Total,kitchenTotal,healthTotal,otherTotal,chosen_unit){

	//totals are in ounces default

	if(chosen_unit=="g"){
		//convert to kg
		clothingTotal 	*=0.0283495;
		big3Total 		*=0.0283495;
		kitchenTotal 	*=0.0283495;
		healthTotal 	*=0.0283495;
		otherTotal 		*=0.0283495;

		pack_total = (clothingTotal+big3Total+kitchenTotal+healthTotal+otherTotal).toFixed(1);
		
		$('#output').html(pack_total+"kg");

		$('#clothing_total').html(clothingTotal.toFixed(1)+" kg");
		$('#kitchen_total').html(kitchenTotal.toFixed(1)+" kg");
		$('#big3_total').html(big3Total.toFixed(1)+" kg");
		$('#health_total').html(healthTotal.toFixed(1)+" kg");
		$('#other_total').html(otherTotal.toFixed(1)+" kg");	

	}else{
		//convert to lbs
		clothingTotal 	*=0.0625;
		big3Total 		*=0.0625;
		kitchenTotal 	*=0.0625;
		healthTotal 	*=0.0625;
		otherTotal 		*=0.0625;

		pack_total = (clothingTotal+big3Total+kitchenTotal+healthTotal+otherTotal).toFixed(1);
		
		$('#output').html(pack_total+"lbs");

		$('#clothing_total').html(clothingTotal.toFixed(1)+" lbs");
		$('#kitchen_total').html(kitchenTotal.toFixed(1)+" lbs");
		$('#big3_total').html(big3Total.toFixed(1)+" lbs");
		$('#health_total').html(healthTotal.toFixed(1)+" lbs");
		$('#other_total').html(otherTotal.toFixed(1)+" lbs");	
	};
};



$('#ounces').click(function(){
	//console.log('ounces were chosen');
	chosen_unit = "oz";
	$('#ounces').css('background-color','white');
	$('#ounces').css('color','#0e83cd');
	$('#grams').css('background-color','');
	$('#grams').css('color','white');
});

$('#grams').click(function(){
	//console.log('grams were chosen');
	chosen_unit = "g";
	$('#ounces').css('background-color','');
	$('#ounces').css('color','white');
	$('#grams').css('background-color','white');
	$('#grams').css('color','#0e83cd');
});



// $('#convert').click(function(){
// 	console.log('convert yo shit yo!');
// });

	// calculate ounces and grams simultaneously, default display ounces, 
	// on grams button-click display equivalent weight in grams in #output box, 
	// on ounces button-click, switch back.

/*-------------------------------------------------------------------------------------------------
	check for valid numeric entry
-------------------------------------------------------------------------------------------------*/

function checkInput(item_weight,item_name) { 

	if ($.isNumeric(item_weight)){
 		document.getElementById(item_name).style.backgroundColor = '#ffffff';
	}
	else{
		item_weight=0;
		alert("please enter a number");
 		document.getElementById(item_name).style.backgroundColor = '#FF4D4D';
	};
};

/*-------------------------------------------------------------------------------------------------
	get values and add to table
-------------------------------------------------------------------------------------------------*/

function addToTable(item,category) { 

	//get the item name in the html td to the left of the input td in question	
	item_name 		= item.parents('tr').find('td').html(); 
	//get item weight
	item_weight 	= item.val(); 

	//if the input cell has a number in it, add a row to the jqw
	if(item_weight !== ""){
		$('#all_pack_items').dataTable().fnAddData( [
		item_name,
		category,
		item_weight ] );
	}
};




/*-------------------------------------------------------------------------------------------------
	calculate
-------------------------------------------------------------------------------------------------*/


function calculateWeight(item_name) {

    var clothingTotal = 0;
    var big3Total = 0;
    var kitchenTotal = 0;
    var healthTotal = 0;
    var otherTotal = 0;

    //reset the jquery table to an empty table and regenerate every time an input cell is changed
    $('#all_pack_items').dataTable().fnClearTable();

    $.each($("#clothing > table").find(".calculate"),function(){
        addToTable($(this),"Clothing");
        clothingTotal+= Number($(this).val());
    });

    $.each($("#big3 > table").find(".calculate"), function( index, value ) {
     	addToTable($(this),"Big 3");
       	big3Total+=Number($(this).val());
    });

    $.each($("#kitchen > table").find(".calculate"), function( index, value ) {
        addToTable($(this),"Kitchen");
        kitchenTotal+=Number($(this).val());
    });

    $.each($("#health > table").find(".calculate"), function( index, value ) {
        addToTable($(this), "Health & Hygiene");
        healthTotal+=Number($(this).val());
    });

    $.each($("#other > table").find(".calculate"), function( index, value ) {
        addToTable($(this),"Other/Extra");
        otherTotal+=Number($(this).val());
    });

	//call unit change function here?

	converter(clothingTotal,big3Total,kitchenTotal,healthTotal,otherTotal,chosen_unit);



};


/*-------------------------------------------------------------------------------------------------
	grabber function
-------------------------------------------------------------------------------------------------*/

$(".calculate").change(function() { 
	checkInput($(this).val(),$(this).attr('id'));
    calculateWeight($(this).attr('id'));
});


