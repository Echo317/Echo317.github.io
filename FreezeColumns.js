define(["jquery"], function ($) {
    "use strict";

    /*
    NOTES:
        Date Last Updated: 1/30/2017
        Author: Jeff Martin
        Usage: Custom control used to freeze columns when scrolling.  Designed for lists, but will work with crosstab unless there
        are nested items in the Rows drop zone.
        Here is a sample config object:
            {
                "controlName":"List1",
                "block":"Block1",
                "columnsToFreeze": 1
            }
            
       */

    function FreezeColumns() {
    };

    FreezeColumns.prototype.draw = function (oControlHost) {

        //variable to reference the json config
        var conf = oControlHost.configuration;
        //check for config
        if (!conf) {
            throw new scriptableReportError("FreezeColumns", "draw method", "Missing configuration.");
        }

        //We know there is a config object so we check to make sure it has the required properties.
        if (!(conf.hasOwnProperty("controlName") && conf.hasOwnProperty("block"))) {
            throw new scriptableReportError("FreezeColumns", "draw method",
                "Configuration object needs at least one property (controlName;block)");
        }

        //Config is good so we move on.
        //get control id so the wrapper is unique if contorl is used multiple times on a page.
        var uniqueId = oControlHost.page.getControlByName(conf.controlName).element.id;

        //jquery references to target control and custom control
        var control = $("#" + uniqueId);
        var container = $("#" + oControlHost.container.id);

        //get wrapper div width
        var freezeWidth =
            this.calculateWidth((!conf.columnsToFreeze ? 1 : conf.columnsToFreeze), control);

        //add div to hold our control and enable the freezing
        container.append("<div id='" + uniqueId + "freezeWrapper' style='overflow-x:hidden;background-color:white'></div>");

        //add local variables for the new divs
        var freezeDiv = $("#" + uniqueId + "freezeWrapper");

        //overlay freezeDiv on the block
        var block = oControlHost.page.getControlByName(conf.block).element.id;
        freezeDiv.offset($("#" + block).offset());

        //set width
        freezeDiv.css("width", freezeWidth);

        //clone control into the freezeDiv that has been sized and clipped
        freezeDiv.append(control.clone());

        //make sure custom control doesn't take up space
        $("[specname='customControl']").css("height", 0);

    };

    FreezeColumns.prototype.calculateWidth = function (numFields, ctrl) {

        var calculatedWidth = 0;

        for (var i = 0; i < numFields; i++) {
            calculatedWidth += ctrl.find("td").eq(i).outerWidth() + 1  /*assumes default borders*/;
        };

        return calculatedWidth;
    };

    return FreezeColumns;
});