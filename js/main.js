		// X - width
		// Y - lenght
		
		var Point  = Isomer.Point;
		var Path   = Isomer.Path;
		var Shape  = Isomer.Shape;
		var Vector = Isomer.Vector;
		var Color  = Isomer.Color;

		var iso = new Isomer(document.getElementById("canvas"));
		
		document.getElementById("start").onclick = function() {
		
			iso.canvas.clear();
			var origX = 1;
			var origY = 0;
			var origZ = 2;
			
			var tabletop = {
			  length: parseFloat(document.getElementById("length").value),
			  width: parseFloat(document.getElementById("width").value),
			  height: parseFloat(document.getElementById("height").value),
			  draw: function(origX, origY, origZ) {
				iso.add(Shape.Prism(Point(origX, origY, origZ), this.width, this.length, this.height));
			  },
			  getFootPlaces: function(){
				if (document.getElementById("typeFoots").value == '1') {
					if (this.length > 5) {
						return [
							[this.width / 4, this.length / 10],
							[this.width - this.width / 4, this.length / 10],
							[this.width / 4, this.length - this.length / 10],
							[this.width - this.width / 4, this.length - this.length / 10],
							[this.width / 4, this.length / 2],
							[this.width - this.width / 4, this.length / 2]
						];
					} else {
						return [
							[this.width / 4, this.length / 10],
							[this.width - this.width / 4, this.length / 10],
							[this.width / 4, this.length - this.length / 10],
							[this.width - this.width / 4, this.length - this.length / 10]
						];
					}
					
				} else if (document.getElementById("typeFoots").value == '2') {
					return [
						[this.width / 2, this.length / 10],
						[this.width / 2, this.length - this.length / 10],
					];
				} else if (document.getElementById("typeFoots").value == '3') {
					return [
						[this.width / 2, this.length / 10],
						[this.width / 2, this.length - this.length / 10],
					];
				} else {
					return [
						[this.width / 2, this.length / 10],
						[this.width / 2, this.length - this.length / 10],
					];
				}
			  }
			};
			
			var foot_single = {
			  length: 0.2,
			  width: 0.2,
			  height: parseFloat(document.getElementById("heightFoots").value),
			  draw: function(origX, origY, origZ, offsetX, offsetY) {
				iso.add(Shape.Prism(Point(origX + offsetX, origY + offsetY, origZ - this.height), this.width, this.length, this.height));
			  }
			};
			
			var footV = {
			  length: 0.15,
			  width: 0.15,
			  height: parseFloat(document.getElementById("heightFoots").value),
			  heightSupport: 0.1,
			  widthSupport: 1.5,
			  lengthSupport: 1,
			  draw: function(origX, origY, origZ, offsetX, offsetY) {
				iso.add(Shape.Prism(Point(origX + offsetX - this.widthSupport/2, origY + offsetY - this.lengthSupport/2, origZ - this.height), this.widthSupport, this.lengthSupport, this.heightSupport));

				var oneFoot = Shape.Prism(Point(origX + offsetX, origY + offsetY, origZ - this.height), this.width, this.length, this.height);
				iso.add(oneFoot.rotateY(Point(origX + offsetX, origY + offsetY, origZ - this.height),  - Math.PI / 18));
				iso.add(oneFoot.rotateY(Point(origX + offsetX, origY + offsetY, origZ - this.height), Math.PI / 18));
			  }
			};
		
			var footX = {
			  length: 0.1,
			  width: 0.1,
			  height: parseFloat(document.getElementById("heightFoots").value),
			  heightSupport: 0.1,
			  widthSupport: 1.5,
			  lengthSupport: 1,
			  draw: function(origX, origY, origZ, offsetX, offsetY) {
				iso.add(Shape.Prism(Point(origX + offsetX - this.widthSupport/2, origY + offsetY - this.lengthSupport/2, origZ - this.height), this.widthSupport, this.lengthSupport, this.heightSupport));
				var oneFoot = Shape.Prism(Point(origX + offsetX, origY + offsetY, origZ - this.height/2), this.width, this.length, this.height/2);
				var oneFootDown = Shape.Prism(Point(origX + offsetX - 0.1, origY + offsetY, origZ - this.height/2), this.width, this.length, this.height/2);
				iso.add(oneFootDown.rotateY(Point(origX + offsetX, origY + offsetY, origZ - this.height/2),  Math.PI / 12 + Math.PI));
				iso.add(oneFootDown.rotateY(Point(origX + offsetX, origY + offsetY, origZ - this.height/2),  - Math.PI / 12 + Math.PI));
				iso.add(oneFoot.rotateY(Point(origX + offsetX, origY + offsetY, origZ - this.height/2), - Math.PI / 12));
				iso.add(oneFoot.rotateY(Point(origX + offsetX, origY + offsetY, origZ - this.height/2), Math.PI / 12));
			  }
			};
		
			/* Собираем стол */
			tabletop1 = Object.create(tabletop);
			var footPlaces = tabletop1.getFootPlaces();
			
			for(var index in footPlaces) { 
				var values = footPlaces[index]; 
				if (document.getElementById("typeFoots").value == '1') {
					foots1 = Object.create(foot_single);
					foots1.draw(origX, origY, origZ, values[0], values[1]);
				} else if (document.getElementById("typeFoots").value == '2') {
					foots1 = Object.create(foot_single);
					foots1.draw(origX, origY, origZ, values[0], values[1]);
				} else if (document.getElementById("typeFoots").value == '3') {
					foots1 = Object.create(footV);
					foots1.draw(origX, origY, origZ, values[0], values[1]);
				} else {
					foots1 = Object.create(footX);
					foots1.draw(origX, origY, origZ, values[0], values[1]);
				}
			}
			
			tabletop1.draw(origX, origY, origZ);
		};