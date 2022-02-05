<template>
  <b-col class="game-controls-box d-flex justify-content-center align-content-center flex-column" style="height: auto">
    <b-button v-if="disableJoin" @click="leaveEvent">	{{ $ml.get("left_chat") }}</b-button>
    <b-button v-else @click="joinEvent">	{{ $ml.get("join_chat") }}</b-button>
    <p v-if="inVoiceChat">	{{ $ml.get("in_chat") }}</p>
    <Player v-for="(stream, index) in remoteStreams" :key="index" :stream="stream" :dom-id="stream.getId()"/>
  </b-col>
</template>

<script>
import RTCClient from "../../../agora-client";
import Player from "./Player";
import api from "../../../api/api";
export default {
  name: "RTCClient",
  components: {Player},
  data () {
    return {
      option: {
        appid: '6d981052c2fc41af918b9fab5d8e8979',
      },
      disableJoin: false,
      localStream: null,
      remoteStreams: [],
      inVoiceChat: false,
    }
  },
  props: {
    token: String,
    channel: String,
    uid: String
  },

  methods: {
    joinEvent () {
      if(!this.option.appid) {
        this.judge('Appid')
        return
      }
      if(!this.channel) {
        this.judge('Channel Name')
        return
      }
      this.option.token = this.token;
      this.option.channel = this.channel;
      this.option.uid = this.uid;
      this.rtc.joinChannel(this.option).then((uid) => {
        api.attachAgoraId(uid).then();
        console.log({
          message: 'Join Success',
          type: 'success'
        });
        this.rtc.publishStream().then((stream) => {
          console.log({
            message: 'Publish Success',
            type: 'success'
          });
          this.localStream = stream
          this.inVoiceChat = true;
        }).catch((err) => {
          this.inVoiceChat = false;
          console.log('Publish Failure');
          console.log('publish local error', err)
        })
      }).catch((err) => {
        this.inVoiceChat = false;
        console.log('Join Failure');
        console.log('join channel error', err)
      })
      this.disableJoin = true
    },
    leaveEvent () {
      this.disableJoin = false
      this.rtc.leaveChannel().then(() => {
        console.log({
          message: 'Leave Success',
          type: 'success'
        });
        this.inVoiceChat = false;
      }).catch((err) => {
        console.log('Leave Failure')
        console.log('leave error', err)
      })
      this.localStream = null
      this.remoteStreams = []
    },
    judge(detail) {
      console.log({
        title: 'Notice',
        message: `Please enter the ${detail}`,
        position: 'top-left',
        type: 'warning'
      });
    },
  },
  beforeDestroy () {
    this.leaveEvent();
  },
  created() {
    this.rtc = new RTCClient()
    let rtc = this.rtc
    rtc.on('stream-added', (evt) => {
      let {stream} = evt
      console.log("[agora] [stream-added] stream-added", stream.getId())
      rtc.client.subscribe(stream)
    })

    rtc.on('stream-subscribed', (evt) => {
      let {stream} = evt
      console.log("[agora] [stream-subscribed] stream-added", stream.getId())
      if (!this.remoteStreams.find((it) => it.getId() === stream.getId())) {
        this.remoteStreams.push(stream)
      }
    })
    rtc.on('stream-removed', (evt) => {
      let {stream} = evt
      console.log('[agora] [stream-removed] stream-removed', stream.getId())
      this.remoteStreams = this.remoteStreams.filter((it) => it.getId() !== stream.getId())
    })
    rtc.on('peer-online', (evt) => {
      console.log(`Peer ${evt.uid} is online`)
    })
    rtc.on('peer-leave', (evt) => {
      console.log(`Peer ${evt.uid} already leave`)
      this.remoteStreams = this.remoteStreams.filter((it) => it.getId() !== evt.uid)
    })
  }
}
</script>

<style scoped>

</style>