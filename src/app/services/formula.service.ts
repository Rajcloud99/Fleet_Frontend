import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import {ConstantService} from "./constant.service";

@Injectable({
  providedIn: 'root'
})
export class FormulaService {
  configs:any;
  constructor(private storageServ: StorageService,
              private constantService: ConstantService){

              }

     formulafactory(formulaKey:any, bindingKey=false){
      if(!formulaKey)
        return false;
    this.configs = this.storageServ.get('userData').configs;
      const OPERATOR_REGEX = /[+%-/*()]/g;
    // @ts-ignore
       let formula = this.configs.formula && this.configs.formula[formulaKey] || this.constantService.constants.formula[formulaKey];
      let operand:any;
      let bindingFromula:any;
      let isValid:any;

      bindingKey && binding(bindingKey);

      return {
        bind: binding,
        eval: evaluator
      };

      function binding(oBinding:any):any{
        isValid = true;
        operand = formula.replace(OPERATOR_REGEX,(replaceString: string) =>(
          '+-*/%'.indexOf(replaceString)+1)?',':'').split(',');
        bindingFromula = formula;
        try{
          operand.forEach((op: string) => {
            op = op.trim();
            bindingFromula = bindingFromula.replace(op, oBinding[op]);
          });
        }catch(e){
          console.log(e);
          isValid = false;
          return false;
        }
      }

      function evaluator(){
        return isValid ? eval(bindingFromula) : 0;
      }
    };
  }
