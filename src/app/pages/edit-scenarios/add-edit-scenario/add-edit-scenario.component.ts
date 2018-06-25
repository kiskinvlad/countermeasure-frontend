import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ValidatorModule } from '@app/shared/form-validator/validator.module';
import { Scenario } from '@app/shared/models/scenario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectScenarioState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchScenario, DeleteScenario, UpdateScenario, CreateScenario } from '@app/shared/ngrx-store/actions/scenario.actions';

@Component({
  selector: 'ct-add-edit-scenario',
  templateUrl: './add-edit-scenario.component.html',
  styleUrls: ['./add-edit-scenario.component.scss']
})
/**
 * Add/Edit scenario component
 * @implements {OnInit, OnDestroy}
 */
export class AddEditScenarioComponent implements OnInit, OnDestroy {
/**
 * @param {Observable<any>} getScenarioState$ Scenario state observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {ValidatorModule} validator Form validaor module param
 * @param {Scenario} scenario Current scenario object param
 * @param {number} case_id Current case id param
 * @param {string} type Component type param
 * @param {number} scenario_id Current scenario id param
 * @param {boolean} isFormTouched Form touched state param
 * @param {FormGroup} categoryForm Scenario form param
 * @param {FormControl} name Form name control param
 * @param {FormControl} probability Form probability control param
 * @param {FormControl} description Form description control param
 * @param {FormControl} taxes Form taxes control param
 * @param {FormControl} penalties Form penalties control param
 * @param {FormControl} interest Form interest control param
 */
  private getScenarioState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  private formSubscription: Subscription;
  private validator: ValidatorModule;
  public scenario: Scenario;
  public case_id: number;
  public type: string;
  public scenario_id: number;
  public isFormTouched: boolean;
  public scenarioForm: FormGroup;
  public name: FormControl;
  public probability: FormControl;
  public description: FormControl;
  public taxes: FormControl;
  public penalties: FormControl;
  public interest: FormControl;
/**
 * @constructor
 * @param {ActivatedRoute} route Current route state service
 * @param {Store<AppState>} store App state store service
 * @param {Router} router  App router service
 */
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
      this.isFormTouched = false;
      this.getScenarioState$ = this.store.select(selectScenarioState);
  }
/**
 * Initialize add-edit-scenario component life cycle method
 */
  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.scenario_id = +params['scenario_id'];
      this.case_id = params['case_id'];
      this.type = params['type'];
      this.validator = new ValidatorModule();
      this.createFormControls();
      this.createForm();
      if (this.type === 'add') {
        this.router.navigate(['/case', this.case_id, 'scenarios', 'edit', 'add']);
      }
    });

    this.subscription = this.getScenarioState$.subscribe((scenario_state) => {
      this.errorMessage = scenario_state.errorMessage;
      this.scenario = (scenario_state.scenario || null);
      if (this.scenario) {
        this.setFormData();
       }
    });

    if (this.scenario_id) {
      const payload = {
        scenario_id: this.scenario_id,
      };
      this.getFormData(payload);
    } else {
      this.scenario = null;
      this.scenarioForm.reset();
    }

    this.formSubscription = this.scenarioForm.statusChanges.subscribe(() => {
      const controllersToCheck = [
        'name',
        'probability',
        'description',
        'taxes',
        'penalties',
        'interest'
      ];
      controllersToCheck.forEach(ctrlName => {
        const ctrl = this.scenarioForm.get(ctrlName);
        if (ctrl.dirty || ctrl.touched) {
          this.isFormTouched = true;
        }
      });
    });
  }
/**
 * Create form controls method
 */
  private createFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
    ]);
    this.probability = new FormControl('', [
      Validators.required
    ]);
    this.description = new FormControl('', [
      Validators.required
    ]);
    this.taxes = new FormControl('', [
      Validators.required
    ]);
    this.penalties = new FormControl('', [
      Validators.required
    ]);
    this.interest = new FormControl('', [
      Validators.required
    ]);
  }
/**
 * Create form method
 */
  private createForm(): void {
    this.scenarioForm = new FormGroup({
      name: this.name,
      probability: this.probability,
      description: this.description,
      taxes: this.taxes,
      penalties: this.penalties,
      interest: this.interest
    });
  }
/**
 * Create form data method
 * @param {object} payload Http request data
 */
  private getFormData(payload: object): void {
    if (this.type === 'edit') {
      this.store.dispatch(new FetchScenario(payload));
    }
  }
/**
 * Set form data method
 */
  private setFormData(): void {
    this.name.setValue(this.scenario.name);
    this.probability.setValue(this.scenario.probability);
    this.description.setValue(this.scenario.description);
    this.taxes.setValue(this.scenario.taxes);
    this.penalties.setValue(this.scenario.penalties);
    this.interest.setValue(this.scenario.interest);
  }
/**
 * Delete scenario method
 */
  private deleteScenario(): void {
    const payload = {
      id: this.scenario_id,
      name: this.scenario.name,
      case_id: this.case_id
    };
    this.store.dispatch(new DeleteScenario(payload));
  }
/**
 * Add/update scenario method
 */
  private addUpdateScenario(): void {
    let payload;
    if (!this.scenarioForm.valid) {
      this.validator.validateFormFields(this.scenarioForm);
    } else {
      payload = {
        name: this.scenarioForm.get('name').value,
        probability:  this.scenarioForm.get('probability').value,
        description: this.scenarioForm.get('description').value,
        taxes: this.scenarioForm.get('taxes').value,
        penalties: this.scenarioForm.get('penalties').value,
        interest: this.scenarioForm.get('interest').value,
        case_id: this.case_id
      };
    }
    if (this.scenario_id && this.scenarioForm.valid) {
      payload['scenario_id'] = this.scenario_id;
      this.store.dispatch(new UpdateScenario(payload));
    } else if (this.scenarioForm.valid) {
      this.store.dispatch(new CreateScenario(payload));
    }
  }
/**
 * Destroy add-edit-scenario component life cycle method
 */
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.formSubscription.unsubscribe();
  }

}
