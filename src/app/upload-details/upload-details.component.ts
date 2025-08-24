import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss'],
})
export class UploadDetailsComponent implements OnInit {
  // State
  uploaded = false;
  isDragging = false;
  errorMsg = '';

  // File/meta
  base64Video: string | null = null;
  videoUrl: string | null = null;
  fileName = '';
  fileSizeMB = 0;
  maxSizeMB = 100; // adjust as needed

  // Thumbnails
  thumbnails: string[] = [];
  selectedThumb: string | null = null;

  // Form
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      thumbnail: [''], // set when user selects a generated thumbnail
    });
  }

  /* ---------- Upload handling ---------- */
  onDragOver(e: DragEvent) {
    e.preventDefault();
    this.isDragging = true;
  }
  onDragLeave(_: DragEvent) {
    this.isDragging = false;
  }
  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;
    const file = e.dataTransfer?.files?.[0];
    if (file) this.processFile(file);
  }

  // Original entry point (file input)
  captureThumbnails(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.processFile(file);
    if (input) input.value = ''; // allow re-select same file
  }

  private processFile(file: File) {
    this.resetVideoState();

    // Type check
    const validTypes = ['video/mp4', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      this.errorMsg = 'Unsupported file type. Please select an MP4 or MOV video.';
      return;
    }

    // Size check
    const sizeMB = +(file.size / (1024 * 1024)).toFixed(1);
    this.fileSizeMB = sizeMB;
    if (sizeMB > this.maxSizeMB) {
      this.errorMsg = `File is too large (${sizeMB} MB). Max allowed is ${this.maxSizeMB} MB.`;
      return;
    }

    this.fileName = file.name;
    this.videoUrl = URL.createObjectURL(file);
    this.uploaded = true;

    // Kick off thumbs + base64
    this.generateThumbnails(this.videoUrl);
    this.convertToBase64(file);
  }

  /* ---------- Thumbnail generation ---------- */
  private generateThumbnails(url: string) {
    const video = document.createElement('video');
    video.src = url;

    video.onloadedmetadata = () => {
      const duration = video.duration || 10;
      const total = 4;
      const interval = Math.max(1, duration / (total + 1));
      this.captureFrames(video, interval, total);
    };
  }

  private captureFrames(video: HTMLVideoElement, interval: number, totalFrames: number) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 320;
    canvas.height = 180;

    this.thumbnails = [];
    let count = 0;

    const step = (time: number) => {
      video.currentTime = Math.min(video.duration - 0.1, time);
      video.onseeked = () => {
        ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        this.thumbnails.push(dataUrl);

        // First thumbnail becomes selected by default
        if (count === 0) {
          this.selectThumb(dataUrl);
        }

        count++;
        if (count < totalFrames) {
          step(time + interval);
        }
      };
    };

    step(interval);
  }

  selectThumb(src: string) {
    this.selectedThumb = src;
    this.formGroup.patchValue({ thumbnail: src });
  }

  regenerateThumbs() {
    if (this.videoUrl) this.generateThumbnails(this.videoUrl);
  }

  trackBySrc = (_: number, src: string) => src;

  /* ---------- Base64 conversion ---------- */
  private convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.base64Video = reader.result as string;
      // console.log('Base64 ready', this.base64Video?.slice(0, 60) + '...');
    };
    reader.onerror = (err) => {
      console.error(err);
      this.errorMsg = 'Failed to read the file. Please try again.';
    };
    reader.readAsDataURL(file);
  }

  /* ---------- Form actions ---------- */
  submit() {
    if (this.formGroup.invalid) return;

    const payload = {
      ...this.formGroup.value,
      fileName: this.fileName,
      fileSizeMB: this.fileSizeMB,
      videoBase64: this.base64Video,
    };

    console.log('SUBMIT ▶', payload);
    // TODO: call your API here
    // this.api.upload(payload).subscribe(...)
  }

  resetAll() {
    this.uploaded = false;
    this.errorMsg = '';
    this.resetVideoState();
    this.formGroup.reset();
  }

  private resetVideoState() {
    this.fileName = '';
    this.fileSizeMB = 0;
    this.videoUrl = null;
    this.base64Video = null;
    this.thumbnails = [];
    this.selectedThumb = null;
  }
}
