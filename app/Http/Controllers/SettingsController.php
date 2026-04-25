<?php

namespace App\Http\Controllers;

use App\Models\Companysetting;
use App\Models\Department;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingsController extends Controller
{

        // PAYROLL SETTINGS //
    public function index(){
        $departments = Department::where('id','>','1')->get();
        $positions = Position::where('id','>','1')->get();
        return Inertia::render('SettingsPayroll',['departments' => $departments, 'positions' => $positions]);
    }
           public function storeDepartment(Request $request)
        {
            if ($request->id) {
                Department::where('id',$request->id)
                    ->update(['department'=>$request->department]);
            } else {
                Department::create([
                    'department'=>$request->department
                ]);
            }

            return back();
        }

            public function storePosition(Request $request)
    {
        if ($request->id) {
            Position::where('id',$request->id)
                ->update(['position'=>$request->position]);
        } else {
            Position::create([
                'position'=>$request->position
            ]);
        }

        return back();
    }

        public function deleteDepartment($id){
             Department::destroy($id);
                return back();
        }


        // COMPANY SETTINGS //

          public function indexCompany(){
                $settings = Companysetting::first();
        return Inertia::render('SettingsCompany',
        ['settings' => $settings]
        );
    }

        public function saveSettings(Request $request){
            $incomingFields = $request->validate([
                    'logo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
                    'company_name' => 'required',
                    'trade_name' => 'nullable',
                    'email' => 'required',
                    'contact_number' => 'required',
                    'address1' => 'required',
                    'address2' => 'nullable',
                    'city' => 'required',
                    'province' => 'required',
                    'zip_code' => 'required',
                    'country' => 'required',
                    'tin' => 'required',
                    'rdo' => 'required',
                    'sss' => 'required',
                    'philhealth' => 'required',
                    'pagibig' => 'required',
                    'business_reg_no' => 'required',
                    'vat_registered' => 'required',
                    'tax_type' => 'required',
            ]);

            
            
            $settings = Companysetting::first(); // get the first record if it exists

            if($settings){
                    // delete old logo
                    if ($request->hasFile('logo')) {
                        //Storage::disk('public')->delete('images/' . $settings->logo);
                        $path = public_path('images/' . $settings->logo);
                            if ($user->images && file_exists($path)) {
                                unlink($path);
                            }

                    $filename = "company" . uniqid() . ".jpg" ;
                    $path = $request->file('logo')->storeAs('images',$filename, 'public');
                    $incomingFields['logo'] = $filename;
                    }else{
                        $incomingFields['logo'] = $settings->logo;
                    }
                    
                // update existing settings
                
                $settings->update($incomingFields);
            }else{
                // create new settings
                $incomingFields['logo'] = 'logo.jpg';
                Companysetting::create($incomingFields);
            }

        }


}
