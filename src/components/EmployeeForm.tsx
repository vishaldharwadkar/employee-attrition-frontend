import React, { useState } from "react";
import axios from "axios";
import "./EmployeeForm.css";

type FormData = {
  [key: string]: number;
};

const dropdownFields: { [key: string]: { label: string; options: { label: string; value: number }[] } } = {
  Gender: {
    label: "Gender",
    options: [
      { label: "Male", value: 1 },
      { label: "Female", value: 0 },
    ],
  },
  OverTime: {
    label: "OverTime",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0 },
    ],
  },
  BusinessTravel: {
    label: "Business Travel",
    options: [
      { label: "Travel_Rarely", value: 1 },
      { label: "Travel_Frequently", value: 2 },
      { label: "Non-Travel", value: 0 },
    ],
  },
  Department: {
    label: "Department",
    options: [
      { label: "Research & Development", value: 0 },
      { label: "Sales", value: 1 },
      { label: "Human Resources", value: 2 },
    ],
  },
  EducationField: {
    label: "Education Field",
    options: [
      { label: "Life Sciences", value: 1 },
      { label: "Medical", value: 3 },
      { label: "Marketing", value: 4 },
      { label: "Technical Degree", value: 5 },
      { label: "Human Resources", value: 2 },
      { label: "Other", value: 0 },
    ],
  },
  JobRole: {
    label: "Job Role",
    options: [
      { label: "Sales Executive", value: 0 },
      { label: "Research Scientist", value: 1 },
      { label: "Laboratory Technician", value: 2 },
      { label: "Manufacturing Director", value: 3 },
      { label: "Healthcare Representative", value: 4 },
      { label: "Manager", value: 5 },
      { label: "Sales Representative", value: 6 },
      { label: "Research Director", value: 7 },
      { label: "Human Resources", value: 8 },
    ],
  },
  MaritalStatus: {
    label: "Marital Status",
    options: [
      { label: "Single", value: 2 },
      { label: "Married", value: 1 },
      { label: "Divorced", value: 0 },
    ],
  },
};

const defaultData: FormData = {
  Age: 35,
  BusinessTravel: 1,
  DailyRate: 800,
  Department: 0,
  DistanceFromHome: 10,
  Education: 3,
  EducationField: 1,
  EnvironmentSatisfaction: 3,
  Gender: 1,
  HourlyRate: 70,
  JobInvolvement: 3,
  JobLevel: 2,
  JobRole: 1,
  JobSatisfaction: 3,
  MaritalStatus: 1,
  MonthlyIncome: 6000,
  MonthlyRate: 15000,
  NumCompaniesWorked: 2,
  OverTime: 1,
  PercentSalaryHike: 15,
  PerformanceRating: 3,
  RelationshipSatisfaction: 3,
  StockOptionLevel: 1,
  TotalWorkingYears: 10,
  TrainingTimesLastYear: 3,
  WorkLifeBalance: 3,
  YearsAtCompany: 5,
  YearsInCurrentRole: 3,
  YearsSinceLastPromotion: 1,
  YearsWithCurrManager: 3,
};

const EmployeeForm = () => {
  const [formData, setFormData] = useState<FormData>(defaultData);
  const [result, setResult] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE}/predict`, formData);
      setResult(response.data.prediction);
    } catch (error) {
      console.error("Prediction error:", error);
      setResult("Prediction failed. Check console.");
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Employee Attrition Predictor</h2>
      <form onSubmit={handleSubmit} className="employee-form">

        {/* Render dropdowns */}
        {Object.entries(dropdownFields).map(([field, config]) => (
          <label key={field}>
            {config.label}:
            <select name={field} value={formData[field]} onChange={handleChange}>
              {config.options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>
        ))}

        {/* Render numeric fields */}
        {Object.entries(formData).map(([key, value]) => {
          if (key in dropdownFields) return null;
          return (
            <label key={key}>
              {key}:
              <input
                type="number"
                name={key}
                value={value}
                onChange={handleChange}
              />
            </label>
          );
        })}

        <div className="button-wrapper">
          <button type="submit">Predict</button>
        </div>

        {result && (
          <div className="result">
            <strong>Prediction:</strong> {result}
          </div>
        )}
      </form>
    </div>
  );
};

export default EmployeeForm;
