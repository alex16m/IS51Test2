import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ToastService } from "../toast/toast.service";

export interface ITest {
  id?: number;
  testName: string;
  pointsPossible: number;
  pointsReceived: number;
  percentage: number;
  grade: string;
}

export interface ISearch {
  name: string;
}

@Component({
  selector: "app-test-score",
  templateUrl: "./test-score.component.html",
  styleUrls: ["./test-score.component.css"]
})
export class TestScoreComponent implements OnInit {
  name: string;
  tests: Array<ITest> = [];
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {}

  async ngOnInit() {
    //  this.tests = await this.loadTests();
  }

  // async loadTests() {
  //   let tests = JSON.parse(localStorage.getItem("tests"));
  //   tests = await this.loadTestsFromJSON();
  //   this.tests = tests;
  //   return tests;
  // }

  // async loadTestsFromJSON() {
  //   const tests = await this.http.get("assets/tests.json").toPromise();
  //   return tests.json;
  // }

  addTest(test: ITest) {
    test = {
      id: null,
      testName: null,
      pointsPossible: null,
      pointsReceived: null,
      percentage: null,
      grade: null
    };
    this.tests.unshift(test);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem("tests", JSON.stringify(this.tests));
  }

  saveSuccess() {
    this.toastService.showToast("success", 3000, "Success: Items saved!");
    console.log("inside save success");
    this.saveToLocalStorage();
  }

  searchCheck(params: string) {
    console.log("this is params.... param", params);
    this.tests.filter((test: ITest) => {
      params;
      return test;
    });
  }

  validate(name: String) {
    console.log("inside validate", name)
    if (name === null || name === "") {
      this.toastService.showToast("warning", 2000, "Name must not be null");
    }
    if (name.indexOf(',') === -1 && name.indexOf(' ') === -1) {
      this.toastService.showToast('warning', 2000, "There must be a comma and a space within the search");
    }
  }

  delete(index: number) {
    this.tests.splice(index,1);
    this.saveToLocalStorage();
  }
}
