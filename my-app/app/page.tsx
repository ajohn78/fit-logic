'use client';


// last updated 09/21/2026 at 2:59pm by Ezekiel Turnbough

import {useEffect, useState} from 'react';
import './style.css'



// Definition of the Exercise object
type Exercise =
{
  Name: string;
  Type: string;
  MusclesWorked: string[];
  EquipmentOptions: string[];
};


// Format of the Exercises json file
type ExerciseData =
{
  _meta: object;
  // Each muscleGroup (key) (for example: "Chest") is associated with an array of objects (Exercises)
  [muscleGroup: string]: Exercise[] | object;
};

type CardioExercise =
{
  Name: string;
  Intensity: string;
  MusclesWorked: string[];
  EquipmentOptions: string[];
};

//*
// Fetches the data from the exercises json file
// Sets up variables to be displayed on the webpage
// Displays Exercises
// Filters Exercises by Muscle Groups focused and Equipment Needed
// */
export default function ExcerciseClass()
{
  // Initializes a variable that represents a list of all exercises
  // Creates a method for setting the exercises
  const [allExercisesList, setExercise] = useState<Exercise[]>([]);

  // Stores a list of exercises that match the current filter
  const [filteredExerciseList, setExerciseFilter] = useState<Exercise[]>([]);
  // Keeps track of the currently selected muscle group
  const [currentMuscles, setCurrentMuscles] =  useState<string[]>([]);
  // Keeps track of the currentlty seclected required equipment
  const [currentEquipment, setCurrentEquipment] =  useState<string[]>([]);
  // Keeps track if the currently displayed exercises are cardio based or strength training
  const [exerciseFocus, setCardioFocus] = useState(false);
  // Allows for errors to be caught
  const [error, setError] = useState<string | null>(null);
   const [allCardioList, setCardioExercise] = useState<CardioExercise[]>([]);
  // Stores a list of exercises that match the current filter
  const [filteredCardioList, setCardioFilter] = useState<CardioExercise[]>([]);
    // Keeps track of the currently selected muscle group
  const [currentCardioMuscles, setCurrentCardioMuscles] =  useState<string[]>([]);
  // Keeps track of the currentlty seclected required equipment
  const [currentCardioEquipment, setCurrentCardioEquipment] =  useState<string[]>([]);

  useEffect(()=> {
  // Fetch the exercise json file
  fetch("./exercises.json")
    .then(response =>
      {
        // Checks if the requested json file was found
        if (!response.ok)
          {
            throw new Error("This json file was not found.");
          }
          return response.json();
      })


     
    .then((json: ExerciseData) => {
      // Initializes an empty list for the exercises to be stored
      const exerciseList: Exercise[] = []
      // Adds the exercises to the exercise list from the json file using the muscle group as the key
      for (const muscleGroup in json)
        {
          if (muscleGroup !== '_meta')
          {
            exerciseList.push(...(json[muscleGroup] as Exercise[]))
          }
        }
        // Stores the all the exercises for a base copy
        setExercise(exerciseList);
        // Copies all the exercises into a different list, so that they can be filtered
        setExerciseFilter(exerciseList);
        // Titles the Page
        document.title = 'Fit-Logic';
      })
      // Catches errors found while loading the JSON file and the exercise data
    .catch((error_found) =>{
        console.error('Could not load JSON file: ', error_found);
        setError('ERROR: Could not load the Muscle Training data.');
     })  
}, []);


useEffect(()=> {
  // Fetch the exercise json file
  fetch("./cardio.json")
    .then(response =>
      {
        // Checks if the requested json file was found
        if (!response.ok)
          {
            throw new Error("This json file was not found.");
          }
          return response.json();
      })

    .then((json: ExerciseData) => {
      // Initializes an empty list for the exercises to be stored
      const cardioList: CardioExercise[] = []
      // Adds the exercises to the exercise list from the json file using the muscle group as the key
      for (const muscleGroup in json)
        {
          if (muscleGroup !== '_meta')
          {
            cardioList.push(...(json[muscleGroup] as CardioExercise[]))
          }
        }
        // Stores the all the exercises for a base copy
        setCardioExercise(cardioList);
        // Copies all the exercises into a different list, so that they can be filtered
        setCardioFilter(cardioList);
        // Titles the Page
        document.title = 'Fit-Logic';
      })
      // Catches errors found while loading the JSON file and the exercise data
    .catch((error_found) =>{
        console.error('Could not load JSON file: ', error_found);
        setError('ERROR: Could not load the Cardio data.');
     })  
}, []);

  /**
   * Filters the list of exercises based on the selected muscle groups and equipment required
   * Updates whenever the selected muscles, equipment required, or full exercise list changes
   *  */
  useEffect(() => {
    // Starts with the full list of exercises
    let filtered = allExercisesList;
    // Checks the length of the list of the current muscles being displayed
    if (currentMuscles.length > 0) {
      // Keeps the exercises that match the selected muscle group being worked
      filtered = filtered.filter((ex) =>
        currentMuscles.some((m) => ex.MusclesWorked.includes(m))
      );
    }
    // Checks the length of the list of the current equipment needed being displayed
    if (currentEquipment.length > 0) {
      // Keeps the exercises that match the selected equipment needed for this exercise
      filtered = filtered.filter((ex) =>
        currentEquipment.some((equ) =>ex.EquipmentOptions.includes(equ))
      );
    }
    // Updates and saves the filtered list of exercises for display
    setExerciseFilter(filtered);
  }, [currentMuscles, currentEquipment, allExercisesList]);

  useEffect(() => {
    // Starts with the full list of exercises
    let filtered = allCardioList;
    // Checks the length of the list of the current muscles being displayed
    // Keeps the exercises that match the selected muscle group being worked
    if (currentCardioMuscles.length > 0)
      {
        filtered = filtered.filter((ex) =>
          currentCardioMuscles.some((m) => ex.MusclesWorked.includes(m))
        );
      }
    // Checks the length of the list of the current equipment needed being displayed
      // Keeps the exercises that match the selected equipment needed for this exercise
      if (currentCardioEquipment.length > 0)
      {
        filtered = filtered.filter((ex) =>
          currentCardioEquipment.some((equ) =>ex.EquipmentOptions.includes(equ))
        );
    }
    // Updates and saves the filtered list of exercises for display
    setCardioFilter(filtered);
  }, [currentCardioMuscles, currentCardioEquipment, allCardioList]);

  // List of all muscle targets to be used for buttons
  const muscleTargets = ['Chest', 'Back', 'Shoulders', 'Triceps', 'Biceps', 'Abs', 'Quads', 'Hamstrings', 'Glutes', 'Calves'];
  // List of all possible equipment options to be used for buttons
  const equipmentOptions = ['None', 'Dumbbells', 'Barbell', 'Bench', 'Cable Machine', 'Weights', 'Medicine Ball', 'Resistance Bands'];
  const cardioTargets = ["Whole Body", "Quads", "Hamstrings", "Calves", "Glutes","Hip Flexors", "Shoulders", "Chest", "Arms", "Back", "Core"];
  const cardioEquipment = ["Nothing", "Treadmill", "Weights", "Bicycle", "Stationary Bike", "Pool", "Jumprope"];


return(
    // Main Exercise Page Header and Title
    /// To center everything type className = "containter" after <main
    <main style={{ backgroundColor: '#f0f8ff', color: '#222' }}>
    <div className='TopBar'>
      <div className='Title'> Fit Logic</div>
      <nav>
        <h1>Home</h1>
        <h2>Exercises</h2>
        <h1>Calculator</h1>
        <h1>Placeholder</h1>
        <h1>Placeholder</h1>
      </nav>
    </div>

    <div className='dropDown'> Exercise Type
        <div className='content'>
          <a onClick={() => setCardioFocus(false)}>Strength Exercises</a>
          <a onClick={() => setCardioFocus(true)}>Cardio Exercises</a>
        </div>
    </div>

    {/* Buttons and display for the targeted muscle groups */}
   
      {!exerciseFocus &&
      (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
            <h1 className="name" style={{ color: 'Black', fontSize: '30px' }}>Muscles Targeted:</h1>
            {muscleTargets.map((muscle) =>(
              <button className='button'
                key = {muscle}
                // When the button is clicked update the exercise filter to include or exclude the selected muscle group
                onClick={() =>
                  setCurrentMuscles((prev_selected) =>
                    prev_selected.includes(muscle) ? prev_selected.filter((m) => m != muscle) : [...prev_selected, muscle])}
                style={{
                  backgroundColor: currentMuscles.includes(muscle) ? '#93B7BE' : 'white',
                  color: currentMuscles.includes(muscle) ? 'white' : 'black',
                }}
                >
                  {muscle}
                </button>
            ))}
          </div>
          )}          
        {/* Buttons and display for the possible equipment options */}
        {!exerciseFocus &&
        (    
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
            <h1 className="name" style={{ color: 'Black', fontSize: '30px' }}>Equipment Options:</h1>
            {equipmentOptions.map((equipm) =>(
              <button className='button'
                key = {equipm}
                // When the button is clicked update the exercise filter to include or exclude the selected muscle group
                onClick={() =>
                  setCurrentEquipment((prev_selected) =>
                    prev_selected.includes(equipm) ? prev_selected.filter((equ) => equ != equipm) : [...prev_selected, equipm])}
                style={{
                  backgroundColor: currentEquipment.includes(equipm) ? '#93B7BE' : 'white',
                  color: currentEquipment.includes(equipm) ? 'white' : 'black',
                }}
                >
                  {equipm}
                </button>
            ))}
          </div>
      )}
     
      {/* Display Exercises */}
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
      {filteredExerciseList.length === 0 && !error && <h2>None of the exercises match these filters.</h2>}
      {!exerciseFocus &&(
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '50px', justifyContent: 'flex-start'}}>
        {filteredExerciseList.map((exercise, index) => (
          <div key = {index} className='exerciseCard'>
                <h2 className="exerciseName">{exercise.Name}</h2>
                <h3 className="exerciseType">Push or Pull: {exercise.Type}</h3>
                {/* Do go back to basic text make classname = "subheading" */}
                <p className="exerciseText">Muscles Worked: {exercise.MusclesWorked.join(', ')}</p>
                <p className="exerciseText">Equipment Options: {exercise.EquipmentOptions.join(', ')}</p>
          </div>
        ))}
        </div>
      )}






      {exerciseFocus &&
      (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
            <h1 className="name" style={{ color: 'Black', fontSize: '30px' }}>Muscles Targeted:</h1>
            {cardioTargets.map((muscle) =>(
              <button className='button'
                key = {muscle}
                // When the button is clicked update the exercise filter to include or exclude the selected muscle group
                onClick={() =>
                  setCurrentCardioMuscles((prev_selected) =>
                    prev_selected.includes(muscle) ? prev_selected.filter((m) => m != muscle) : [...prev_selected, muscle])}
                style={{
                  backgroundColor: currentCardioMuscles.includes(muscle) ? '#93B7BE' : 'white',
                  color: currentCardioMuscles.includes(muscle) ? 'white' : 'black',
                }}
                >
                  {muscle}
                </button>
            ))}
          </div>
          )}          
        {/* Buttons and display for the possible equipment options */}
        {exerciseFocus &&
        (    
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
            <h1 className="name" style={{ color: 'Black', fontSize: '30px' }}>Equipment Options:</h1>
            {cardioEquipment.map((equipm) =>(
              <button className='button'
                key = {equipm}
                // When the button is clicked update the exercise filter to include or exclude the selected muscle group
                onClick={() =>
                  setCurrentCardioEquipment((prev_selected) =>
                    prev_selected.includes(equipm) ? prev_selected.filter((equ) => equ != equipm) : [...prev_selected, equipm])}
                style={{
                  backgroundColor: currentCardioEquipment.includes(equipm) ? '#93B7BE' : 'white',
                  color: currentCardioEquipment.includes(equipm) ? 'white' : 'black',
                }}
                >
                  {equipm}
                </button>
            ))}
          </div>
      )}
     
      {/* Display Exercises */}
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
      {filteredCardioList.length === 0 && !error && <h2>None of the exercises match these filters.</h2>}
      {exerciseFocus &&(
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '50px', justifyContent: 'flex-start'}}>
        {filteredCardioList.map((exercise, index) => (
          <div key = {index} className='exerciseCard'>
                <h2 className="exerciseName">{exercise.Name}</h2>
                <h3 className="exerciseType">Intensity: {exercise.Intensity}</h3>
                {/* Do go back to basic text make classname = "subheading" */}
                <p className="exerciseText">Muscles Worked: {exercise.MusclesWorked.join(', ')}</p>
                <p className="exerciseText">Equipment Options: {exercise.EquipmentOptions.join(', ')}</p>
          </div>
        ))}
        </div>
      )}
    </main>
  );
}