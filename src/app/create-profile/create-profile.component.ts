import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

type Entry = [string, any];

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  form!: FormGroup;

  // Options for selects (cleaned & strongly typed)
  parametersOptions = [
    { count: '1', value: 'one' },
    { count: '2', value: 'two' },
    { count: '3', value: 'three' },
    { count: '4', value: 'four' },
    { count: '5', value: 'five' },
    { count: '6', value: 'six' },
  ];

  serviceOptions = [
    { count: 'Lite', value: 'lite' },
    { count: 'Standard', value: 'standard' },
    { count: 'Premium', value: 'premium' },
    { count: 'Enterprises', value: 'enterprises' },
    { count: 'Business Subscription', value: 'business' },
  ];

  // Preview data
  storedData: any = null;
  storedEntries: Entry[] = [];
  selectedFileName = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      parameters: ['', Validators.required],
      service: ['', Validators.required],
      country: [''],
      file: [null], // will store file name (or file if you later upload)
    });

    this.loadProfileData();
  }

  // Save to localStorage and refresh preview
  save(): void {
    if (this.form.invalid) return;

    const raw = this.form.value;
    const payload = {
      name: raw.name,
      parameters: raw.parameters,
      service: raw.service,
      country: raw.country,
      file: this.selectedFileName || null,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem('form', JSON.stringify(payload));
    this.loadProfileData();
    this.form.markAsPristine();
  }

  reset(): void {
    this.form.reset();
    this.selectedFileName = '';
  }

  onFileChange(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedFileName = file.name;
      this.form.patchValue({ file: file.name });
      this.form.markAsDirty();
    }
  }

  loadProfileData(): void {
    const stored = localStorage.getItem('form');
    if (!stored) {
      this.storedData = null;
      this.storedEntries = [];
      return;
    }
    this.storedData = JSON.parse(stored);
    // Order keys nicely for preview
    const order = ['name', 'parameters', 'service', 'country', 'file', 'savedAt'];
    const entries: Entry[] = [];
    for (const key of order) {
      if (this.storedData[key] !== undefined && this.storedData[key] !== null && this.storedData[key] !== '') {
        entries.push([key, this.storedData[key]]);
      }
    }
    this.storedEntries = entries;
  }

  trackByEntry = (_: number, e: Entry) => e[0];

  // Nicely label keys
  labelize(key: string): string {
    switch (key) {
      case 'savedAt': return 'Saved At';
      case 'file': return 'File';
      default:
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
  }
}
