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
          <div
            class="item"
            v-for="driver in drivers"
            :key="driver.id"
          >
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
export default {
  data() {
    return {
      user: null,
      drivers: []
    };
  },
  async mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
firebase
      .firestore()
      .collection("users")
      .where("active", "==", true)
      .onSnapshot(snap => {
        this.drivers = [];
        for (let i = 0; i < snap.docs.length; i++) {
          var driver = snap.docs[i].data();
          this.drivers.push(driver);
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
  width: 250px;
  padding: 12px;
}
.right-view {
  flex-grow: 1;
}
</style>