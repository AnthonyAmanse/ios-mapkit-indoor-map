The README for a Code Pattern is very prescriptive, use the following template to get you started.

<!--Put badges at the very top -->
<!--change the repos -->
<!--change the tracking number -->
<!-- [![Build Status](https://travis-ci.org/IBM/watson-banking-chatbot.svg?branch=master)](https://travis-ci.org/IBM/watson-banking-chatbot) -->
<!--Add a new Title and fill in the blanks -->
# iOS Indoor Map View
In this Code Pattern, we will create an indoor map using Apple's MapKit framework and a Cloud Foundry app for the iOS app's backend. The iOS app will be using the existing framework MapKit to display the map while the backend will used to generate a PDF file of an indoor map. The indoor map is a floor plan in the Think Conference's developer zone. With the use of a backend data that is separate to the iOS app, developers would not need to keep updating their iOS app if they want to modify their indoor map's PDF floor plan. This app extends the sample code in [Footprint: Indoor positioning](https://developer.apple.com/library/content/samplecode/footprint/Listings/Swift_README_md.html) from Apple.

When the reader has completed this Code Pattern, they will understand how to:

* Deploy a Cloud Foundry app
* Build an iOS map using MapKit
* Integrate the iOS map to get data from the Cloud Foundry app
* Make custom overlays with MapKit

<!--Remember to dump an image in this path-->
![](doc/source/images/architecture.png)

## Flow
<!--Add new flow steps based on the architecture diagram-->
1. Step 1.
2. Step 2.
3. Step 3.
4. Step 4.
5. Step 5.

<!--Update this section-->
## Included components
Select components from [here](https://github.ibm.com/developer-journeys/journey-docs/tree/master/_content/dev#components), copy and paste the raw text for ease
* [Cloud Foundry](http://cloudfoundry.org/): Build, deploy, and run applications on an open source cloud platform.
* [Compose for MongoDB](https://console.bluemix.net/catalog/services/compose-for-mongodb): MongoDB with its powerful indexing and querying, aggregation and wide driver support, has become the go-to JSON data store for many startups and enterprises.

<!--Update this section-->
## Featured technologies
Select components from [here](https://github.ibm.com/developer-journeys/journey-docs/tree/master/_content/dev#technologies), copy and paste the raw text for ease
* [Mobile](https://mobilefirstplatform.ibmcloud.com/): Systems of engagement are increasingly using mobile technology as the platform for delivery.
* [Node.js](https://nodejs.org/): An open-source JavaScript run-time environment for executing server-side JavaScript code.

# Steps

1. [Clone the repo](#1-clone-the-repo)
2. [Create Compose for MongoDB](#2-create-compose-for-mongodb)
3. [Deploy the Cloud Foundry app](#3-deploy-the-cloud-foundry-app)
4. [Configure the iOS application](#4-configure-the-ios-application)
5. [Run the iOS application](#5-run-the-ios-application)
6. [Turn heatmap on](#6-turn-heatmap-on)

### 1. Clone the repo

```
$ git clone https://github.com/IBM/ios-mapkit-indoor-map
cd ios-mapkit-indoor-map
```

### 2. Create Compose for MongoDB

Create Compose for MongoDB and name it `heatmap-compose-mongodb`:

* [**Compose for MongoDB**](https://console.bluemix.net/catalog/services/compose-for-mongodb)

After the provisioning is complete, you'll need to insert some documents in the database.
In the IBM Cloud Dashboard of the compose instance you just created, copy the Mongo command line connection string
![connection string](docs/mongo-command.png)

Generate the documents using `real-data.js`. Add this filename at the end of the command line connection string
> You may need to install mongo shell if you don't have it yet

```
$ mongo --ssl --sslAllowInvalidCertificates <url> -u <user> -p <password> --authenticationDatabase admin real-data.js
```

### 3. Deploy the Cloud Foundry app

Go to `heatmap-backend` and push the app in Cloud Foundry in your account. After the app is pushed, you'll need to copy the app url which you will need after this step. The url will be formatted like `heatmap-backend-<random-name>.mybluemix.net`

<pre>
$ cd heatmap-backend
$ bx cf push
...
...
Showing health and status for app heatmap-backend in org Developer Advocacy / space dev as Anthony.Amanse@ibm.com...
OK

requested state: started
instances: 1/1
usage: 128M x 1 instances
<b>urls: heatmap-backend-unvillainous-washout.mybluemix.net</b>
last uploaded: Mon Mar 12 00:02:39 UTC 2018
stack: cflinuxfs2
buildpack: SDK for Node.js(TM) (ibm-node.js-6.12.3, buildpack-v3.18-20180206-1137)

     state     since                    cpu    memory      disk      details
#0   running   2018-03-11 05:04:56 PM   0.0%   0 of 128M   0 of 1G
</pre>

### 4. Configure the iOS application

Open `heatmap.xcodeproj` with Xcode. This loads all the source which you need to build the iOS app.

In `ViewController.swift`, modify the line (line 13) to use your own backend URL (CF_APP_URL in the swift file) which you just deployed in Cloud Foundry.
<pre>
...
let CF_APP_URL:String = "https://<b>heatmap-backend-unvillainous-washout.mybluemix.net</b>"
...
</pre>

### 5. Run the iOS application

Once you have modified and saved the `ViewController.swift` to use your own backend, run the app using a simulator or your own iPhone.
You should see Apple Maps using the PDF from your backend as an indoor map.
<img src="docs/initial-view.png" width="35%" height="35%">

The sample debugging annotations should show you the origin (0,0) of your pdf and the anchors. The anchors are there so that the MapView will know where to place the PDF. It needs the longitude and latitude of the location of the place of your indoor map. These data are in `real-data.js` which you have inserted in MongoDB.

### 6. Turn heatmap on

With custom overlays and the data from the backend, you could create a heatmap over your indoor map. You can turn on the heatmap using the toggle at the bottom right corner of the app.

<img src="docs/initial-heatmap.png" width="35%" height="35%">

You'll see that the app will render some overlays above the indoor map. To update the data from the backend, use `random.js` to generate random data which should change colors of the overlay depending on the number of events from each zone. The overlays will update every 5 seconds when the toggle is on.

```
$ export CF_APP_URL="heatmap-backend-unvillainous-washout.mybluemix.net"
$ node random.js

Sending 6 number of events to zone: 8
Sending 5 number of events to zone: 5
Sending 9 number of events to zone: 1
Sending 10 number of events to zone: 3
...
```

<img src="docs/heatmap-with-data.png" width="35%" height="35%">

# Links

* [MapKit](https://developer.apple.com/documentation/mapkit)
* [Footprint: Indoor positioning](https://developer.apple.com/library/content/samplecode/footprint/Listings/Swift_README_md.html)

# Learn more

* **Mobile Code Patterns**: Enjoyed this Code Pattern? Check out our other [Mobile Code Patterns](https://developer.ibm.com/code/technologies/mobile/).
* **Node.js Code Patterns**: Enjoyed this Code Pattern? Check out our other [Node.js Code Patterns](https://developer.ibm.com/code/technologies/node-js/).

# License
[Apache 2.0](LICENSE)