import { makeAutoObservable } from 'mobx';
import { fabric } from 'fabric';
import { getUid, isHtmlAudioElement, isHtmlImageElement, isHtmlVideoElement } from '@/utils';
import anime, { get } from 'animejs';
import { MenuOption, EditorElement, Animation, TimeFrame, VideoEditorElement, AudioEditorElement, Placement, ImageEditorElement, Effect, TextEditorElement } from '../types';
import { FabricUitls } from '@/utils/fabric-utils';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import { cookies } from 'next/dist/client/components/headers';

export class Store {
  [x: string]: any;
  canvas: fabric.Canvas | null

  backgroundColor: string;
  textalign: string;
  textColor: string;
  fontFamily: string;
  strokeSzie: number;
  storkColor: string;
  brightness: number;
  pixelate: number;
  hue : number;
  contrast: number;

  selectedMenuOption: MenuOption;
  audios: string[]
  videos: string[]
  images: string[]
  sticker: string[]
  editorElements: EditorElement[]
  selectedElement: EditorElement | null;
  element : EditorElement[] | undefined = [];
  maxTime: number
  minTime: number
  animations: Animation[]
  animationTimeLine: anime.AnimeTimelineInstance;
  playing: boolean;

  currentKeyFrame: number;
  fps: number;

  possibleVideoFormats: string[] = ['mp4', 'gif'];
  selectedVideoFormat: 'mp4' | 'gif';

  

  constructor() {
    this.canvas = null;
    this.videos = [];
    this.images = [];
    this.sticker = [];
    this.audios = [];
    this.editorElements = [];
    this.backgroundColor = '#111111';
    this.textalign = 'center';
    this.textColor = '#FFFFFF';
    this.fontFamily = 'Arial';
    this.strokeSzie = 0;
    this.storkColor = '';
    this.brightness = 100;
    this.hue = 0;
    this.pixelate = 0;
    this.contrast = 50;
    this.maxTime = 5 * 1000;
    this.minTime = this.maxTime / 5;
    this.playing = false;
    this.currentKeyFrame = 0;
    this.selectedElement = null;
    this.fps = 60;
    this.animations = [];
    this.animationTimeLine = anime.timeline();
    this.selectedMenuOption = 'Image';
    this.selectedVideoFormat = 'mp4';
    makeAutoObservable(this);
  }

  get currentTimeInMs() {
    return this.currentKeyFrame * 1000 / this.fps;
  }

  setCurrentTimeInMs(time: number) {
    this.currentKeyFrame = Math.floor(time / 1000 * this.fps);
  }

  setElements(elements: EditorElement[]) {
    this.elements = elements;
  }

  removeElement(id: string) {
    this.elements = this.elements.filter((element: EditorElement) => element.id !== id);
  }

  setSelectedMenuOption(selectedMenuOption: MenuOption) {
    this.selectedMenuOption = selectedMenuOption;
  }

  setCanvas(canvas: fabric.Canvas | null) {
    this.canvas = canvas;
    if (canvas) {
      canvas.backgroundColor = this.backgroundColor;
    }
  }

  setBackgroundColor(backgroundColor: string) {
    this.backgroundColor = backgroundColor;
    if (this.canvas) {
      this.canvas.backgroundColor = backgroundColor;
    }
  }

  setTextColorStore(textColor: string) {
    this.textColor = textColor;
    console.log('setTextColor selectedElement  ---------------> ', this.selectedElement)
    if (this.selectedElement && this.selectedElement.type === 'text') {
      this.updateEditorElement(this.selectedElement);

    }
  }
  setFontFamily(fontFamily: string) {
    this.fontFamily = fontFamily;
    if (this.selectedElement && this.selectedElement.type === 'text') {
      this.updateEditorElement(this.selectedElement);
    }
  }

  setTextAlign(textalign: string) {
    this.textalign = textalign;
    if (this.selectedElement && this.selectedElement.type === 'text') {
      this.updateEditorElement(this.selectedElement);
    }
  }

  setStrokeSize(strokeSzie: number) {
    this.strokeSzie = strokeSzie;
    if (this.selectedElement && this.selectedElement.type === 'text') {
      this.updateEditorElement(this.selectedElement);
    }
  }

  setStrokeColor(strokeColor: string) {
    this.storkColor = strokeColor;
    if (this.selectedElement && this.selectedElement.type === 'text') {
      this.updateEditorElement(this.selectedElement);
    }
  }

  setBrightness(brightness: number) {
    this.brightness = brightness;
    console.log('setBrightness brightness store ---------------> ', this.brightness)
    if (this.selectedElement && this.selectedElement.type === 'image') {
      this.updateEditorElement(this.selectedElement);
    }
    this.refreshElements();
  }

  setContrast(contrast: number) {
    this.contrast = contrast;
    if (this.selectedElement && this.selectedElement.type === 'image') {
      this.updateEditorElement(this.selectedElement);
    }
    this.refreshElements();
  }

  setHue(hue : number){
    this.hue = hue;
    if (this.selectedElement && this.selectedElement.type === 'image') {
      this.updateEditorElement(this.selectedElement);
    }
    this.refreshElements();
  }

  setPixelate(pixelate: number) {
    console.log('setPixelate pixelate store ---------------> ', pixelate)
    this.pixelate = pixelate;
    if (this.selectedElement && this.selectedElement.type === 'image') {
      this.updateEditorElement(this.selectedElement);
    }
    this.refreshElements();
  }

  updateEffect(id: string, effect: Effect) {
    const index = this.editorElements.findIndex((element) => element.id === id);
    const element = this.editorElements[index];
    if (isEditorVideoElement(element) || isEditorImageElement(element)) {
      element.properties.effect = effect;
    }
    this.refreshElements();
  }

  updateFilter(id: string, filter: string) {
    const index = this.editorElements.findIndex((element) => element.id === id);
    const element = this.editorElements[index];
    if (isEditorVideoElement(element) || isEditorImageElement(element)) {
      // element.properties.effect.filter = filter;
    }
    this.refreshElements();
  }

  setVideos(videos: string[]) {
    this.videos = videos;
  }

  addVideoResource(video: string) {
    this.videos = [...this.videos, video];
  }
  addAudioResource(audio: string) {
    this.audios = [...this.audios, audio];
  }
  addImageResource(image: string) {
    this.images = [...this.images, image];
    console.log(this.images);
    console.log("image added");
  }

  addStickerResource(sticker: string) {
    this.sticker = [...this.sticker, sticker];
    console.log(this.sticker);
    console.log("sticker added");
  }

  addAnimation(animation: Animation) {
    this.animations = [...this.animations, animation];
    this.refreshAnimations();
  }
  updateAnimation(id: string, animation: Animation) {
    const index = this.animations.findIndex((a) => a.id === id);
    this.animations[index] = animation;
    this.refreshAnimations();
  }

  refreshAnimations() {
    anime.remove(this.animationTimeLine);
    this.animationTimeLine = anime.timeline({
      duration: this.maxTime,
      autoplay: false,
    });
    for (let i = 0; i < this.animations.length; i++) {
      const animation = this.animations[i];
      const editorElement = this.editorElements.find((element) => element.id === animation.targetId);
      const fabricObject = editorElement?.fabricObject;
      if (!editorElement || !fabricObject) {
        continue;
      }
      fabricObject.clipPath = undefined;
      switch (animation.type) {
        case "fadeIn": {
          this.animationTimeLine.add({
            opacity: [0, 1],
            duration: animation.duration,
            targets: fabricObject,
            easing: 'linear',
          }, editorElement.timeFrame.start);
          break;
        }
        case "fadeOut": {
          this.animationTimeLine.add({
            opacity: [1, 0],
            duration: animation.duration,
            targets: fabricObject,
            easing: 'linear',
          }, editorElement.timeFrame.end - animation.duration);
          break
        }
        case "slideIn": {

          const direction = animation.properties.direction;
          const targetPosition = {
            left: editorElement.placement.x,
            top: editorElement.placement.y,
          }
          const startPosition = {
            left: (direction === "left" ? - editorElement.placement.width : direction === "right" ? this.canvas?.width : editorElement.placement.x),
            top: (direction === "top" ? - editorElement.placement.height : direction === "bottom" ? this.canvas?.height : editorElement.placement.y),
          }
          if (animation.properties.useClipPath) {
            const clipRectangle = FabricUitls.getClipMaskRect(editorElement, 50);
            fabricObject.set('clipPath', clipRectangle)
          }
          if (editorElement.type === "text" && animation.properties.textType === "character") {
            this.canvas?.remove(...editorElement.properties.splittedTexts)
            // @ts-ignore
            editorElement.properties.splittedTexts = getTextObjectsPartitionedByCharacters(editorElement.fabricObject, editorElement);
            editorElement.properties.splittedTexts.forEach((textObject) => {
              this.canvas!.add(textObject);
            })
            const duration = animation.duration / 2;
            const delay = duration / editorElement.properties.splittedTexts.length;
            for (let i = 0; i < editorElement.properties.splittedTexts.length; i++) {
              const splittedText = editorElement.properties.splittedTexts[i];
              const offset = {
                left: splittedText.left! - editorElement.placement.x,
                top: splittedText.top! - editorElement.placement.y
              }
              this.animationTimeLine.add({
                left: [startPosition.left! + offset.left, targetPosition.left + offset.left],
                top: [startPosition.top! + offset.top, targetPosition.top + offset.top],
                delay: i * delay,
                duration: duration,
                targets: splittedText,
              }, editorElement.timeFrame.start);
            }
            this.animationTimeLine.add({
              opacity: [1, 0],
              duration: 1,
              targets: fabricObject,
              easing: 'linear',
            }, editorElement.timeFrame.start);
            this.animationTimeLine.add({
              opacity: [0, 1],
              duration: 1,
              targets: fabricObject,
              easing: 'linear',
            }, editorElement.timeFrame.start + animation.duration);

            this.animationTimeLine.add({
              opacity: [0, 1],
              duration: 1,
              targets: editorElement.properties.splittedTexts,
              easing: 'linear',
            }, editorElement.timeFrame.start);
            this.animationTimeLine.add({
              opacity: [1, 0],
              duration: 1,
              targets: editorElement.properties.splittedTexts,
              easing: 'linear',
            }, editorElement.timeFrame.start + animation.duration);
          }
          this.animationTimeLine.add({
            left: [startPosition.left, targetPosition.left],
            top: [startPosition.top, targetPosition.top],
            duration: animation.duration,
            targets: fabricObject,
            easing: 'linear',
          }, editorElement.timeFrame.start);
          break
        }
        case "slideOut": {
          const direction = animation.properties.direction;
          const startPosition = {
            left: editorElement.placement.x,
            top: editorElement.placement.y,
          }
          const targetPosition = {
            left: (direction === "left" ? - editorElement.placement.width : direction === "right" ? this.canvas?.width : editorElement.placement.x),
            top: (direction === "top" ? -100 - editorElement.placement.height : direction === "bottom" ? this.canvas?.height : editorElement.placement.y),
          }
          if (animation.properties.useClipPath) {
            const clipRectangle = FabricUitls.getClipMaskRect(editorElement, 50);
            fabricObject.set('clipPath', clipRectangle)
          }
          this.animationTimeLine.add({
            left: [startPosition.left, targetPosition.left],
            top: [startPosition.top, targetPosition.top],
            duration: animation.duration,
            targets: fabricObject,
            easing: 'linear',
          }, editorElement.timeFrame.end - animation.duration);
          break
        }
        case "breathe": {
          const itsSlideInAnimation = this.animations.find((a) => a.targetId === animation.targetId && (a.type === "slideIn"));
          const itsSlideOutAnimation = this.animations.find((a) => a.targetId === animation.targetId && (a.type === "slideOut"));
          const timeEndOfSlideIn = itsSlideInAnimation ? editorElement.timeFrame.start + itsSlideInAnimation.duration : editorElement.timeFrame.start;
          const timeStartOfSlideOut = itsSlideOutAnimation ? editorElement.timeFrame.end - itsSlideOutAnimation.duration : editorElement.timeFrame.end;
          if (timeEndOfSlideIn > timeStartOfSlideOut) {
            continue;
          }
          const duration = timeStartOfSlideOut - timeEndOfSlideIn;
          const easeFactor = 4;
          const suitableTimeForHeartbeat = 1000 * 60 / 72 * easeFactor
          const upScale = 1.05;
          const currentScaleX = fabricObject.scaleX ?? 1;
          const currentScaleY = fabricObject.scaleY ?? 1;
          const finalScaleX = currentScaleX * upScale;
          const finalScaleY = currentScaleY * upScale;
          const totalHeartbeats = Math.floor(duration / suitableTimeForHeartbeat);
          if (totalHeartbeats < 1) {
            continue;
          }
          const keyframes = [];
          for (let i = 0; i < totalHeartbeats; i++) {
            keyframes.push({ scaleX: finalScaleX, scaleY: finalScaleY });
            keyframes.push({ scaleX: currentScaleX, scaleY: currentScaleY });
          }

          this.animationTimeLine.add({
            duration: duration,
            targets: fabricObject,
            keyframes,
            easing: 'linear',
            loop: true
          }, timeEndOfSlideIn);

          break
        }
      }
    }
  }

  removeAnimation(id: string) {
    this.animations = this.animations.filter(
      (animation) => animation.id !== id
    );
    this.refreshAnimations();
  }

  setSelectedElement(selectedElement: EditorElement | null) {
    this.selectedElement = selectedElement;
    if (this.canvas) {
      if (selectedElement?.fabricObject)
        this.canvas.setActiveObject(selectedElement.fabricObject);
      else
        this.canvas.discardActiveObject();
    }
  }
  updateSelectedElement() {
    this.selectedElement = this.editorElements.find((element) => element.id === this.selectedElement?.id) ?? null;
  }

  setEditorElements(editorElements: EditorElement[]) {
    this.editorElements = editorElements;
    this.updateSelectedElement();
    this.refreshElements();
    // this.refreshAnimations();
  }

  updateEditorElement(editorElement: EditorElement) {
    this.setEditorElements(this.editorElements.map((element) =>
      element.id === editorElement.id ? editorElement : element
    ));
  }

  updateEditorElementTimeFrame(editorElement: EditorElement, timeFrame: Partial<TimeFrame>) {
    if (timeFrame.start != undefined && timeFrame.start < 0) {
      timeFrame.start = 0;
    }
    if (timeFrame.end != undefined && timeFrame.end > this.maxTime) {
      timeFrame.end = this.maxTime;
    }
    const newEditorElement = {
      ...editorElement,
      timeFrame: {
        ...editorElement.timeFrame,
        ...timeFrame,
      }
    }
    this.updateVideoElements();
    this.updateAudioElements();
    this.updateEditorElement(newEditorElement);
    this.refreshAnimations();
  }


  addEditorElement(editorElement: EditorElement) {
    console.log('addEditorElement : editorElement ---------------> ', editorElement)
    this.setEditorElements([...this.editorElements, editorElement]);
    this.refreshElements();
    this.setSelectedElement(this.editorElements[this.editorElements.length - 1]);
  }

  removeEditorElement(id: string) {
    this.setEditorElements(this.editorElements.filter(
      (editorElement) => editorElement.id !== id
    ));
    
    this.refreshElements();
  }

  setMaxTime(maxTime: number) {
    this.maxTime = maxTime;
  }


  setPlaying(playing: boolean) {
    this.playing = playing;
    this.updateVideoElements();
    this.updateAudioElements();
    if (playing) {
      this.startedTime = Date.now();
      this.startedTimePlay = this.currentTimeInMs
      requestAnimationFrame(() => {
        this.playFrames();
      });
    }
  }

  startedTime = 0;
  startedTimePlay = 0;

  playFrames() {
    if (!this.playing) {
      return;
    }
    const elapsedTime = Date.now() - this.startedTime;
    const newTime = this.startedTimePlay + elapsedTime;
    this.updateTimeTo(newTime);
    if (newTime > this.maxTime) {
      this.currentKeyFrame = 0;
      this.setPlaying(true);
    } else {
      requestAnimationFrame(() => {
        this.playFrames();
      });
    }
  }
  updateTimeTo(newTime: number) {
    this.setCurrentTimeInMs(newTime);
    this.animationTimeLine.seek(newTime);
    if (this.canvas) {
      this.canvas.backgroundColor = this.backgroundColor;
    }
    this.editorElements.forEach(
      e => {
        if (!e.fabricObject) return;
        const isInside = e.timeFrame.start <= newTime && newTime <= e.timeFrame.end;
        e.fabricObject.visible = isInside;
      }
    )
  }

  handleSeek(seek: number) {
    if (this.playing) {
      this.setPlaying(false);
    }
    this.updateTimeTo(seek);
    this.updateVideoElements();
    this.updateAudioElements();
  }

  addVideo(index: number) {
    const videoElement = document.getElementById(`video-${index}`);
    if (!isHtmlVideoElement(videoElement)) {
      return;
    }
    const videoDurationMs = videoElement.duration * 1000;
    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    const id = getUid();

    const canvasWidth = this.canvas?.getWidth() ?? 0;
    const canvasHeight = this.canvas?.getHeight() ?? 0;
    const placementX = (canvasWidth - 100 * aspectRatio) / 2;
    const placementY = (canvasHeight - 100) / 2;

    this.addEditorElement(
      {
        id,
        name: `Media(video) ${index + 1}`,
        type: "video",
        placement: {
          x: placementX,
          y: placementY,
          width: 100 * aspectRatio,
          height: 100,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
        },
        timeFrame: {
          start: 0,
          end: videoDurationMs,
        },
        properties: {
          elementId: `video-${id}`,
          src: videoElement.src,
          effect: {
            type: "none",
          },
          brightness: this.brightness,
          contrast: this.contrast,
          hue: this.hue,
          pixelate: this.pixelate,
        },
      },
    );
  }

  addStickers(index: number) {
    const stickerElement = document.getElementById(`sticker-${index}`);
    if (!isHtmlVideoElement(stickerElement)) {
      return;
    }
    // Calculate the duration in milliseconds
    const stickerDurationMs = stickerElement.duration * 1000;
    const aspectRatio = stickerElement.videoWidth / stickerElement.videoHeight; // Correct aspect ratio calculation
    const id = getUid();
    // Function to loop the sticker video
    const loopSticker = () => {
      stickerElement.currentTime = 0;
      stickerElement.play();
    };
    // Set interval to ensure the sticker video loops within the timeframe
    const intervalId = setInterval(loopSticker, stickerDurationMs);
    // Set a timeout to clear the interval after the timeframe ends
    setTimeout(() => clearInterval(intervalId), 5000);
    // Set up the editor element
    const canvasWidth = this.canvas?.getWidth() ?? 0;
    const canvasHeight = this.canvas?.getHeight() ?? 0;
    const placementX = (canvasWidth - 100 * aspectRatio) / 2;
    const placementY = (canvasHeight - 100) / 2;

    this.addEditorElement({
      id,
      name: `Media(sticker) ${index + 1}`,
      type: "video",
      placement: {
        x: placementX,
        y: placementY,
        width: 100 * aspectRatio,
        height: 100,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
      },
      timeFrame: {
        start: 0,
        end: stickerDurationMs, // 5 seconds timeframe
      },
      properties: {
        elementId: `sticker-${id}`,
        src: stickerElement.src,
        effect: {
          type: "none",
        },
        brightness: this.brightness,
        contrast: this.contrast,
        hue: this.hue,
        pixelate: this.pixelate,
      },
    });

    // Start playing the sticker video
    stickerElement.play();
  }


  addImage(index: number) {
    console.log('add image >>>>>>>>>>>>>>>>>>>> ', index)
    const imageElement = document.getElementById(`image-${index}`)
    console.log('addImage imageElement ---------------> ', imageElement)
    if (!isHtmlImageElement(imageElement)) {
      return;
    }
    const aspectRatio = imageElement.naturalWidth / imageElement.naturalHeight;
    const id = getUid();

    const canvasWidth = this.canvas?.getWidth() ?? 0;
    const canvasHeight = this.canvas?.getHeight() ?? 0;
    const placementX = (canvasWidth - 100 * aspectRatio) / 2;
    const placementY = (canvasHeight - 100) / 2;



    this.addEditorElement(
      {
        id,
        name: `Media(image) ${index + 1}`,
        type: "image",
        placement: {
          x: placementX,
          y: placementY,
          width: 100 * aspectRatio,
          height: 100,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
        },
        timeFrame: {
          start: 0,
          end: this.maxTime,
        },
        properties: {
          elementId: `image-${id}`,
          src: imageElement.src,
          effect: {
            type: "none",
          },
          brightness: this.brightness,
          contrast: this.contrast,
          hue:this.hue,
          pixelate: this.pixelate,
        },
      },
    );
  }

  addText(options: {
    text: string,
    fontSize: number,
    textColor: string,
    fontWeight: number,
    textalign: string,
    fontFamily: string,
    strokeSzie: number,
    strokeColor: string

  }) {
    // console.log('options ---------------> ', options)
    const id = getUid();
    const index = this.editorElements.length;
    const canvasWidth = this.canvas?.getWidth() ?? 0;
    const canvasHeight = this.canvas?.getHeight() ?? 0;
    const placementX = (canvasWidth - 100) / 2;
    const placementY = (canvasHeight - 100) / 2;


    this.addEditorElement(
      {
        id,
        name: `Text ${index + 1}`,
        type: "text",
        placement: {
          x: placementX,
          y: placementY,
          width: 100,
          height: 100,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
        },
        timeFrame: {
          start: 0,
          end: this.minTime,
        },
        properties: {
          text: options.text,
          fontSize: options.fontSize,
          fontWeight: options.fontWeight,
          textColor: options.textColor,
          fontFamily: options.fontFamily,
          textalign: options.textalign,
          strokeSize: options.strokeSzie,
          strokeColor: options.textColor,
          splittedTexts: [],
          effect: {
            type: "none",
          }

        },
      },
    );
  }

  updateVideoElements() {
    this.editorElements.filter(
      (element): element is VideoEditorElement =>
        element.type === "video"
    )
      .forEach((element) => {
        const video = document.getElementById(element.properties.elementId);
        if (isHtmlVideoElement(video)) {
          const videoTime = (this.currentTimeInMs - element.timeFrame.start) / 1000;
          video.currentTime = videoTime;
          if (this.playing) {
            video.play();
          } else {
            video.pause();
          }
        }
      })
  }
  updateAudioElements() {
    this.editorElements.filter(
      (element): element is AudioEditorElement =>
        element.type === "audio"
    )
      .forEach((element) => {
        const audio = document.getElementById(element.properties.elementId);
        if (isHtmlAudioElement(audio)) {
          const audioTime = (this.currentTimeInMs - element.timeFrame.start) / 1000;
          audio.currentTime = audioTime;
          if (this.playing) {
            audio.play();
          } else {
            audio.pause();
          }
        }
      })
  }
  // saveCanvasToVideo() {
  //   const video = document.createElement("video");
  //   const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  //   const stream = canvas.captureStream();
  //   video.srcObject = stream;
  //   video.play();
  //   const mediaRecorder = new MediaRecorder(stream);
  //   const chunks: Blob[] = [];
  //   mediaRecorder.ondataavailable = function (e) {
  //     console.log("data available");
  //     console.log(e.data);
  //     chunks.push(e.data);
  //   };
  //   mediaRecorder.onstop = function (e) {
  //     const blob = new Blob(chunks, { type: "video/webm" });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "video.webm";
  //     a.click();
  //   };
  //   mediaRecorder.start();
  //   setTimeout(() => {
  //     mediaRecorder.stop();
  //   }, this.maxTime);

  // }

  setVideoFormat(format: 'mp4' | 'gif') {
    this.selectedVideoFormat = format;
  }

  saveCanvasToVideoWithAudio() {
    this.saveCanvasToVideoWithAudioWebmMp4();
  }

  saveCanvasToVideoWithAudioWebmMp4() {
    console.log('modified')
    let mp4 = this.selectedVideoFormat === 'mp4'
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const stream = canvas.captureStream(30);
    const audioElements = this.editorElements.filter(isEditorAudioElement)
    const audioStreams: MediaStream[] = [];
    audioElements.forEach((audio) => {
      const audioElement = document.getElementById(audio.properties.elementId) as HTMLAudioElement;
      let ctx = new AudioContext();
      let sourceNode = ctx.createMediaElementSource(audioElement);
      let dest = ctx.createMediaStreamDestination();
      sourceNode.connect(dest);
      sourceNode.connect(ctx.destination);
      audioStreams.push(dest.stream);
    });
    audioStreams.forEach((audioStream) => {
      stream.addTrack(audioStream.getAudioTracks()[0]);
    });
    const video = document.createElement("video");
    video.srcObject = stream;
    video.height = 500;
    video.width = 800;
    // video.controls = true;
    // document.body.appendChild(video);
    video.play().then(() => {
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
        console.log("data available");

      };
      mediaRecorder.onstop = async function (e) {
        const blob = new Blob(chunks, { type: "video/webm" });

        if (mp4) {
          // lets use ffmpeg to convert webm to mp4
          const data = new Uint8Array(await (blob).arrayBuffer());
          const ffmpeg = new FFmpeg();
          const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd"
          await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            // workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
          });
          await ffmpeg.writeFile('video.webm', data);
          await ffmpeg.exec(["-y", "-i", "video.webm", "-c", "copy", "video.mp4"]);
          // await ffmpeg.exec(["-y", "-i", "video.webm", "-c:v", "libx264", "video.mp4"]);

          const output = await ffmpeg.readFile('video.mp4');
          const outputBlob = new Blob([output], { type: "video/mp4" });
          const outputUrl = URL.createObjectURL(outputBlob);
          const a = document.createElement("a");
          a.download = "video.mp4";
          a.href = outputUrl;
          a.click();

        } else {
          const data = new Uint8Array(await (blob).arrayBuffer());
          const ffmpeg = new FFmpeg();
          const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd"
          await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            // workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
          });
          await ffmpeg.writeFile('video.webm', data);
          await ffmpeg.exec(["-y", "-i", "video.webm", "-c", "copy", "video.mp4"]);
          await ffmpeg.exec(["-i", "video.mp4", "videogif.gif"])
          // await ffmpeg.exec(["-y", "-i", "video.webm", "-c:v", "libx264", "video.mp4"]);

          const output = await ffmpeg.readFile('videogif.gif');
          const outputBlob = new Blob([output], { type: "image/gif" });
          const outputUrl = URL.createObjectURL(outputBlob);
          const a = document.createElement("a");
          a.download = "video-test.gif";
          a.href = outputUrl;
          a.click();
        }
      };
      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
      }, this.maxTime);
      video.remove();
    })
  }

  refreshElements() {
    const store = this;
    if (!store.canvas) return;
    const canvas = store.canvas;
    store.canvas.remove(...store.canvas.getObjects());
    for (let index = 0; index < store.editorElements.length; index++) {
      const element = store.editorElements[index];
      switch (element.type) {
        case "video": {
          console.log("elementid --------------------> ", element.properties.elementId);
          if (document.getElementById(element.properties.elementId) == null)
            continue;
          const videoElement = document.getElementById(
            element.properties.elementId
          );
          if (!isHtmlVideoElement(videoElement)) continue;
          // const filters = [];
          // if (element.properties.effect?.type === "blackAndWhite") {
          //   filters.push(new fabric.Image.filters.Grayscale());
          // }
          const videoObject = new fabric.CoverVideo(videoElement, {
            name: element.id,
            left: element.placement.x,
            top: element.placement.y,
            width: element.placement.width,
            height: element.placement.height,
            scaleX: element.placement.scaleX,
            scaleY: element.placement.scaleY,
            angle: element.placement.rotation,
            objectCaching: false,
            selectable: true,
            lockUniScaling: true,
            // filters: filters,
            // @ts-ignore
            customFilter: element.properties.effect.type,
            brightness: this.brightness,
            contrast: this.contrast,
            hue: this.hue,
            pixelate: this.pixelate
          });

          element.fabricObject = videoObject;
          element.properties.imageObject = videoObject;
          videoElement.width = 100;
          videoElement.height =
            (videoElement.videoHeight * 100) / videoElement.videoWidth;
          canvas.add(videoObject);
          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target;
            if (target != videoObject) return;
            const placement = element.placement;
            const newPlacement: Placement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              width:
                target.width && target.scaleX
                  ? target.width * target.scaleX
                  : placement.width,
              height:
                target.height && target.scaleY
                  ? target.height * target.scaleY
                  : placement.height,
              scaleX: 1,
              scaleY: 1,
            };
            const newElement = {
              ...element,
              placement: newPlacement,
            };
            store.updateEditorElement(newElement);
          });
          break;
        }
        case "image": {
          if (document.getElementById(element.properties.elementId) == null)
            continue;
          const imageElement = document.getElementById(
            element.properties.elementId
          );
          if (!isHtmlImageElement(imageElement)) continue;
          // const filters = [];
          // if (element.properties.effect?.type === "blackAndWhite") {
          //   filters.push(new fabric.Image.filters.Grayscale());
          // }
          const imageObject = new fabric.CoverImage(imageElement, {
            name: element.id,
            left: element.placement.x,
            top: element.placement.y,
            angle: element.placement.rotation,
            objectCaching: false,
            selectable: true,
            lockUniScaling: true,
            // filters
            // @ts-ignore
            customFilter: element.properties.effect.type,
            brightness: this.brightness,
            contrast: this.contrast,
            hue: this.hue,
            pixelate: this.pixelate
          });
          // imageObject.applyFilters();
          element.fabricObject = imageObject;
          element.properties.imageObject = imageObject;
          const image = {
            w: imageElement.naturalWidth,
            h: imageElement.naturalHeight,
          };

          imageObject.width = image.w;
          imageObject.height = image.h;
          imageElement.width = image.w;
          imageElement.height = image.h;
          imageObject.scaleToHeight(image.w);
          imageObject.scaleToWidth(image.h);
          const toScale = {
            x: element.placement.width / image.w,
            y: element.placement.height / image.h,
          };
          imageObject.scaleX = toScale.x * element.placement.scaleX;
          imageObject.scaleY = toScale.y * element.placement.scaleY;
          canvas.add(imageObject);
          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target;
            if (target != imageObject) return;
            const placement = element.placement;
            let fianlScale = 1;
            if (target.scaleX && target.scaleX > 0) {
              fianlScale = target.scaleX / toScale.x;
            }
            const newPlacement: Placement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              scaleX: fianlScale,
              scaleY: fianlScale,
            };
            const newElement = {
              ...element,
              placement: newPlacement,
            };
            store.updateEditorElement(newElement);
          });
          break;
        }
        case "audio": {
          break;
        }
        case "text": {
          const textObject = new fabric.Textbox(element.properties.text, {
            name: element.id,
            left: element.placement.x,
            top: element.placement.y,
            scaleX: element.placement.scaleX,
            scaleY: element.placement.scaleY,
            width: element.placement.width,
            height: element.placement.height,
            angle: element.placement.rotation,
            fontSize: element.properties.fontSize,
            fontWeight: element.properties.fontWeight,
            objectCaching: false,
            selectable: true,
            lockUniScaling: true,
            textAlign: this.textalign,
            fill: this.textColor, // text color
            fontFamily: this.fontFamily,
            stroke: this.storkColor,
            // strokeWidth: this.strokeSzie,
          });
          element.fabricObject = textObject;
          canvas.add(textObject);
          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target;
            if (target != textObject) return;
            const placement = element.placement;
            const newPlacement: Placement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              width: target.width ?? placement.width,
              height: target.height ?? placement.height,
              scaleX: target.scaleX ?? placement.scaleX,
              scaleY: target.scaleY ?? placement.scaleY,
            };
            const newElement = {
              ...element,
              placement: newPlacement,
              properties: {
                ...element.properties,
                // @ts-ignore
                text: target?.text,
              },
            };
            store.updateEditorElement(newElement);
          });
          break;
        }
        default: {
          throw new Error("Not implemented");
        }
      }
      if (element.fabricObject) {
        element.fabricObject.on("selected", function (e) {
          store.setSelectedElement(element);
        });
      }
    }
    const selectedEditorElement = store.selectedElement;
    if (selectedEditorElement && selectedEditorElement.fabricObject) {
      canvas.setActiveObject(selectedEditorElement.fabricObject);
    }
    this.refreshAnimations();
    this.updateTimeTo(this.currentTimeInMs);
    store.canvas.renderAll();
  }

}


export function isEditorAudioElement(
  element: EditorElement
): element is AudioEditorElement {
  return element.type === "audio";
}
export function isEditorVideoElement(
  element: EditorElement
): element is VideoEditorElement {
  return element.type === "video";
}

export function isEditorImageElement(
  element: EditorElement
): element is ImageEditorElement {
  return element.type === "image";
}

export function isEditorTextElement(
  element: EditorElement
): element is TextEditorElement {
  return element.type === "text";
}

function getTextObjectsPartitionedByCharacters(textObject: fabric.Text, element: TextEditorElement): fabric.Text[] {
  let copyCharsObjects: fabric.Text[] = [];
  // replace all line endings with blank
  const characters = (textObject.text ?? "").split('').filter((m) => m !== '\n');
  const charObjects = textObject.__charBounds;
  if (!charObjects) return [];
  const charObjectFixed = charObjects.map((m, index) => m.slice(0, m.length - 1).map(m => ({ m, index }))).flat();
  const lineHeight = textObject.getHeightOfLine(0);
  for (let i = 0; i < characters.length; i++) {
    if (!charObjectFixed[i]) continue;
    const { m: charObject, index: lineIndex } = charObjectFixed[i];
    const char = characters[i];
    const scaleX = textObject.scaleX ?? 1;
    const scaleY = textObject.scaleY ?? 1;
    const charTextObject = new fabric.Text(char, {
      left: charObject.left * scaleX + (element.placement.x),
      scaleX: scaleX,
      scaleY: scaleY,
      top: lineIndex * lineHeight * scaleY + (element.placement.y),
      fontSize: textObject.fontSize,
      fontWeight: textObject.fontWeight,
      textAlign: element.properties.textalign,
      fill: element.properties.textColor,
      fontFamily: element.properties.fontFamily,
    });
    copyCharsObjects.push(charTextObject);
  }
  return copyCharsObjects;
}