<template>
  <div class="admin-view">
    <section class="left-view">
      <div class="ui segment center aligned">
        <div v-if="user">{{user.email}}</div>
        <div>Admin</div>
        <button class="ui button red" @click="signOutButtonPressed">Signout</button>
      </div>
      <div class="ui segment">
        <div class="ui divided items">
          <div class="item" v-for="driver in drivers" :key="driver.id">
            <div class="content">
              <div class="header">{{driver.email}}</div>
              <div class="meta">
                Lat : {{driver.lat}}
                <br />
                Lng :{{driver.lng}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="right-view" ref="map"></section>
  </div>
</template>

<script>
import firebase from "firebase";
import motorSvg from "@/assets/img/motorcycle.svg";
import deliverSvg from "@/assets/img/delivery-man.svg";
import deliver1Svg from "@/assets/img/delivery-man1.svg";
import tuktukSvg from "@/assets/img/tuk-tuk.svg";
import tuktuk3Svg from "@/assets/img/tuk-tuk3.svg";
import tuktuk4Svg from "@/assets/img/tuk-tuk4.svg";
import carSvg from "@/assets/img/hatchback.svg";
export default {
  data() {
    return {
      user: null,
      drivers: [],
      map: null
    };
  },
  async mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });

    this.map = new google.maps.Map(this.$refs["map"], {
      zoom: 13,
      center: new google.maps.LatLng(-6.7785501,39.2611719),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    const { docs } = await firebase
      .firestore()
      .collection("users")
      .where("active", "==", true)
      .get();

    const markers = [];
    const infoWindows = [];


      const svgMarker = {
        url: deliver1Svg,
        fillColor: "blue",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        //anchor: new google.maps.Point(15, 30),
        scaledSize: new google.maps.Size(25, 30), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        //anchor: new google.maps.Point(0, 0), // anchor
      }

    for (let i = 0; i < docs.length; i++) {
      markers.push(
        new google.maps.Marker({
          map: this.map,
          icon: svgMarker
        })
      );

      infoWindows.push(new google.maps.InfoWindow({ disableAutoPan: true }));
    }

    firebase
      .firestore()
      .collection("users")
      .where("active", "==", true)
      .onSnapshot(snap => {
        this.drivers = [];
        for (let i = 0; i < snap.docs.length; i++) {
          var driver = snap.docs[i].data();
          this.drivers.push(driver);

          markers[i].setPosition(
            new google.maps.LatLng(driver.lat, driver.lng)
          );

          infoWindows[i].setContent(
            `<div class="ui header">${driver.email} </div>`
          );
          infoWindows[i].open(this.map, markers[i]);
        }
      });
  },

  methods: {
    signOutButtonPressed() {
      firebase
        .auth()
        .signOut()
        .then(user => {
          this.$router.push({
            name: "Signin"
          });
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  }
};
</script>

<style>
.admin-view {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
}
.left-view {
  width: 300px;
  padding: 12px;
}

.right-view {
  flex-grow: 1;
}
</style>