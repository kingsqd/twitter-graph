import { Component, OnInit } from '@angular/core';
import { Songs } from '../songs';
import { ChartService } from '../chart.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  providers: [ChartService]
})
export class GraphComponent implements OnInit {

  songs: Songs[]
  map = new Map<string, number>();
  firstSong: Songs
  name: number;
  constructor(private chartService: ChartService) { }

  ngOnInit() {
      this.chartService
        .getTop100()
        .then((songs: Songs[]) => {
          this.songs = songs.map((song) => {
            return song;
          })
          this.firstSong = songs[0];
          this.populateMap(songs);
          
        });
  }

  populateMap(songs: Songs[]): void {
    songs.forEach(function (song) {
      let artString = song.artist;
      artString.replace('Featuring', ',');
      let i = 0;
      for(i = 0; i < artString.length; i++){
          let name = '';
          while(i < artString.length && (artString.charAt(i) !== ',' || artString.charAt(i) !== '&' || artString.charAt(i) !== '&')){
            name += artString.charAt(i);
            i++;
          }
          i--;
          name = name.trim();
          if(this.map.has(name)){
            this.map.set(name, this.map.get(name) + 1);
          } else {
            this.map.set(name, 1);
          }
      }
    });
    this.name = this.map.get("Cardi B");
  }

}
