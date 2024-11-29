import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Commune } from '../models/Commune';
import { Region } from '../models/Region';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private cachedRegions: Region[] = [];
  private cachedCommunes: Commune[] = [];

  constructor(private httpClient: HttpClient) {}

  getRegions(): Observable<Region[]> {
    return this.httpClient
      .get<{ regions: Region[] }>('regions')
      .pipe(map((data) => data.regions));
  }

  getCommunesByRegionId(regionId: number): Observable<Commune[]> {
    return this.httpClient
      .get<{ communes: Commune[] }>(`regions/${regionId}/communes`)
      .pipe(map((data) => data.communes));
  }
}
