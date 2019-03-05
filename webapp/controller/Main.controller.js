sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/vk/ContentResource",
	"sap/ui/model/json/JSONModel"
], function (Controller, ContentResource, JSONModel) {
	"use strict";

	var temperature = 0;
	var humidity = 0;
	var pressure = 0;

	var temperatureChart;
	var humidityChart;
	var pressureChart;

	var temperatureLimit = 100 - temperature;
	var humidityLimit = 100 - humidity;
	var pressureLimit = 100 - pressure;
	
	var temperatureLabel;
	var humidityLabel;
	var pressureLabel;

	return Controller.extend("DPROP.controller.Main", {

		onAfterRendering: function () {
			
			temperatureLabel = this.getView().byId("temperatureLabel");
			humidityLabel = this.getView().byId("humidityLabel");
			pressureLabel = this.getView().byId("pressureLabel");
			
			temperatureChart = this.getView().byId("temperatureChart");

			var temperatureData = {
				datasets: [{
					data: [temperature, temperatureLimit],
					backgroundColor: [
						'#ff3d3b',
						'#ffffff',
					]
				}],

				labels: [
					'Data',
					'Limit',
				]
			};

			temperatureChart.setData(temperatureData);

			humidityChart = this.getView().byId("humidityChart");

			var humidityData = {
				datasets: [{
					data: [humidity, humidityLimit],
					backgroundColor: [
						'#FF8034',
						'#ffffff',
					]
				}],

				labels: [
					'Data',
					'Limit',
				]
			};

			humidityChart.setData(humidityData);

			pressureChart = this.getView().byId("pressureChart");

			var pressureData = {
				datasets: [{
					data: [pressure, pressureLimit],
					backgroundColor: [
						'#FFBD2D',
						'#ffffff',
					]
				}],

				labels: [
					'Data',
					'Limit',
				]
			};

			pressureChart.setData(pressureData);

		},

		onInit: function () {

			var socket = io('http://35.188.154.74:3000/');
			socket.on('connect', function () {
				//socket.emit('customer', "testing dual emit");
				console.log(socket.id);
				console.log('SUCCESS');
			});

			var that = this;

			socket.on('bot', function (msg) {

				console.log("message" + msg);
				//twinText.setText(msg);

				var response = JSON.parse(msg);

				temperature = parseInt(response.temp);
				humidity = parseInt(response.humid);
				pressure = parseInt(response.pressure);
				
				temperatureLimit = 100 - temperature;
				humidityLimit = 100 - humidity;
				pressureLimit = 100 - pressure;
				
				temperatureLabel.setText(response.temp + "°C");
				humidityLabel.setText(response.humid + "%");
				pressureLabel.setText(response.pressure + "P");

				var temperatureData = {
					datasets: [{
						data: [temperature, temperatureLimit],
						backgroundColor: [
							'#ff3d3b',
							'#ffffff',
						]
					}],

					labels: [
						'Data',
						'Limit',
					]
				};

				temperatureChart.setData(temperatureData);
				temperatureChart.update();

				var humidityData = {
					datasets: [{
						data: [humidity, humidityLimit],
						backgroundColor: [
							'#FF8034',
							'#ffffff',
						]
					}],

					labels: [
						'Data',
						'Limit',
					]
				};

				humidityChart.setData(humidityData);
				humidityChart.update();

				var pressureData = {
					datasets: [{
						data: [pressure, pressureLimit],
						backgroundColor: [
							'#FFBD2D',
							'#ffffff',
						]
					}],

					labels: [
						'Data',
						'Limit',
					]
				};

				pressureChart.setData(pressureData);
				pressureChart.update();
			});

		}

	});
});