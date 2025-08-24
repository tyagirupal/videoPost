import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

type FilterKey = 'parameter' | 'country' | 'expert';

interface FilterGroup {
  key: FilterKey;
  heading: string;
  checkdata: { label: string }[];
}

interface Chip {
  key: FilterKey;
  keyLabel: string;
  value: string;
}

@Component({
  selector: 'app-review-catalogue',
  templateUrl: './review-catalogue.component.html',
  styleUrls: ['./review-catalogue.component.scss'],
})
export class ReviewCatalogueComponent implements OnInit {
  // Search box
  searchCtrl = new FormControl('');

  // Sort selection
  sort: 'Latest' | 'Popular' | 'Trending' = 'Popular';

  // Filter groups (normalized keys)
  filterData: FilterGroup[] = [
    {
      key: 'parameter',
      heading: 'Select Parameter',
      checkdata: [{ label: '4' }, { label: '6' }, { label: '1' }, { label: '2' }, { label: '3' }, { label: '5' }],
    },
    {
      key: 'country',
      heading: 'Select Country',
      checkdata: [{ label: 'UK' }, { label: 'USA' }, { label: 'Germany' }, { label: 'France' }, { label: 'Canada' }],
    },
    {
      key: 'expert',
      heading: 'Select Expert',
      checkdata: [{ label: 'Expert_A' }, { label: 'Expert_B' }, { label: 'Expert_C' }, { label: 'Expert_D' }, { label: 'Expert_E' }],
    },
  ];

  // Selected state, by key
  selected: Record<FilterKey, Set<string>> = {
    parameter: new Set<string>(),
    country: new Set<string>(),
    expert: new Set<string>(),
  };

  constructor() {}

  ngOnInit(): void {
    // If you want to debounce and call an API:
    // this.searchCtrl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(v => this.applyQuery());
  }

  // Toggle a checkbox
  toggle(key: FilterKey, value: string): void {
    const set = this.selected[key];
    set.has(value) ? set.delete(value) : set.add(value);
  }

  // Is selected helper for checkbox binding
  isSelected(key: FilterKey, value: string): boolean {
    return this.selected[key].has(value);
  }

  // Build chips list for UI
  get appliedFilters(): Chip[] {
    const keyLabels: Record<FilterKey, string> = {
      parameter: 'Parameter',
      country: 'Country',
      expert: 'Expert',
    };
    const chips: Chip[] = [];
    (Object.keys(this.selected) as FilterKey[]).forEach((k) => {
      this.selected[k].forEach((v) => {
        chips.push({ key: k, keyLabel: keyLabels[k], value: v });
      });
    });
    return chips;
  }

  trackByChip = (_: number, c: Chip) => `${c.key}:${c.value}`;

  removeChip(c: Chip): void {
    this.selected[c.key].delete(c.value);
  }

  clearAll(): void {
    (Object.keys(this.selected) as FilterKey[]).forEach((k) => this.selected[k].clear());
    this.searchCtrl.reset();
  }

  // Example: Build a query you could send to your API
  private buildQuery() {
    return {
      search: this.searchCtrl.value || '',
      sort: this.sort,
      parameter: Array.from(this.selected.parameter),
      country: Array.from(this.selected.country),
      expert: Array.from(this.selected.expert),
    };
  }

  // You can call this when filters change to fetch data
  // applyQuery() {
  //   const q = this.buildQuery();
  //   this.api.getVideos(q).subscribe(...)
  // }
}
