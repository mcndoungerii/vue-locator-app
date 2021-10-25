<template>
  <div class="driver-view">
    <section class="top-bar">
      <div v-if="user">{{user.email}}</div>
      <div>Driver</div>
      <button class="ui button red" @click="signOutButtonPressed">Signout</button>
    </section>

    <section ref="map" class="map"></section>

    <section class="bottom-bar">
      <div class="latLngLabel">{{lat}}, {{lng}}</div>
      <button class="ui button green" @click="startLocationUpdates">
        <i class="circle dot outline icon large"></i>
        Start Location
      </button>

      <button class="ui button red" @click="stopLocationUpdates">
        <i class="circle dot outline icon large"></i>
        Stop Location
      </button>
    </section>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: null,
      lat: 0,
      lng: 0,
      watchPositionId: null
    };
  },

  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  },

  methods: {
    startLocationUpdates() {
      var map = new google.maps.Map(this.$refs["map"], {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      const svgMarker = {
        path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "blue",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        anchor: new google.maps.Point(15, 30),
      }

      const lineSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: "#393",
      };

      var marker = new google.maps.Marker({
        map: map,
        icon: lineSymbol
      });

      this.watchPositionId = navigator.geolocation.watchPosition(
        position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          map.setCenter(new google.maps.LatLng(this.lat, this.lng));
          marker.setPosition(new google.maps.LatLng(this.lat, this.lng));
          this.updateLocation(this.lat, this.lng);
        },
        error => {
          console.log(error.message);
        }
      );
    },

    stopLocationUpdates() {
      navigator.geolocation.clearWatch(this.watchPositionId);
    },

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
    },
    updateLocation(lat, lng) {
      const db = firebase.firestore();
      db.collection("users")
        .doc(this.user.uid)
        .set({ lat: lat, lng: lng, active: true }, { merge: true });
    }
  }
};
</script>


<style>
.driver-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.top-bar {
  height: 100px;
  text-align: center;
  background: white;
}

.map {
  flex-grow: 1;
  background-color: rgba(0, 0, 0, 0.1);
}

.bottom-bar {
  padding: 20px 0px;
  text-align: center;
  background: white;
}
</style>

