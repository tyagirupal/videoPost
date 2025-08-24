import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  isDragging = false;
  reading = false;
  progress = 0;

  base64Video: string | null = null;
  fileName = '';
  fileSizeMB = 0;
  errorMsg = '';

  // 100 MB default; tweak as you like
  maxSizeMB = 100;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // --- Drag & Drop handlers ---
  onDragOver(ev: DragEvent) {
    ev.preventDefault();
    this.isDragging = true;
  }
  onDragLeave(_: DragEvent) {
    this.isDragging = false;
  }
  onDrop(ev: DragEvent) {
    ev.preventDefault();
    this.isDragging = false;
    const file = ev.dataTransfer?.files?.[0];
    if (file) this.handleFile(file);
  }

  // --- File input ---
  onFileInput(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.handleFile(file);
    // reset input so selecting same file again still triggers change
    if (input) input.value = '';
  }

  // --- Core logic ---
  private handleFile(file: File) {
    this.resetState();
    // Validate type
    const validTypes = ['video/mp4', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      this.errorMsg = 'Unsupported file type. Please select an MP4 or MOV video.';
      return;
    }
    // Validate size
    const sizeMB = +(file.size / (1024 * 1024)).toFixed(1);
    if (sizeMB > this.maxSizeMB) {
      this.errorMsg = `File is too large (${sizeMB} MB). Max allowed is ${this.maxSizeMB} MB.`;
      return;
    }

    this.fileName = file.name;
    this.fileSizeMB = sizeMB;
    this.readFileAsBase64(file);
  }

  private readFileAsBase64(file: File) {
    this.reading = true;
    this.progress = 0;

    const reader = new FileReader();

    // Not all browsers emit onprogress reliably, but use it when available
    reader.onprogress = (e: ProgressEvent<FileReader>) => {
      if (e.lengthComputable) {
        this.progress = Math.min(100, Math.round((e.loaded / e.total) * 100));
      }
    };

    reader.onload = () => {
      this.base64Video = reader.result as string;
      this.progress = 100;
      this.reading = false;

      // Persist and navigate (choose one of the below strategies)
      // Strategy A: pass via router state
      this.router.navigate(['/upload-details'], {
        state: { videoBase64: this.base64Video, fileName: this.fileName }
      });

      // Strategy B (alt): store temporarily in localStorage
      // localStorage.setItem('uploadedVideo', this.base64Video!);
      // localStorage.setItem('uploadedVideoName', this.fileName);
      // this.router.navigate(['/upload-details']);
    };

    reader.onerror = () => {
      this.errorMsg = 'Failed to read the file. Please try again.';
      this.reading = false;
    };

    reader.readAsDataURL(file);
  }

  private resetState() {
    this.errorMsg = '';
    this.base64Video = null;
    this.fileName = '';
    this.fileSizeMB = 0;
    this.progress = 0;
    this.reading = false;
  }

  // (Kept for compatibility if you call it elsewhere)
  upload() {
    this.router.navigate(['/upload-details']);
  }

  // (Kept for compatibility with your earlier API)
  convertToBase64(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.handleFile(file);
  }
}
