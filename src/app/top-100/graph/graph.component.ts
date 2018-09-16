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
  firstSong: Songs
  constructor(private chartService: ChartService) { }

  ngOnInit() {
      this.chartService
        .getTop100()
        .then((songs: Songs[]) => {
          this.songs = songs.map((song) => {
            return song;
          })
          this.firstSong = songs[0];
        });

  }

}
