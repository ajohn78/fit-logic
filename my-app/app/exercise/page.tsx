'use client';
// last updated 09/21/2026 at 2:59pm by Ezekiel Turnbough

import {useEffect, useState} from 'react';
import '../style.css'
import Link from 'next/link';

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
  // Keeps track of the currently selected muscle group
  const [currentMuscles, setCurrentMuscles] =  useState<string[]>([]);
  // Keeps track of the currentlty seclected required equipment
  const [currentEquipment, setCurrentEquipment] =  useState<string[]>([]);

  const [allCardioList, setCardioExercise] = useState<CardioExercise[]>([]);
    // Keeps track of the currently selected muscle group
  const [currentCardioMuscles, setCurrentCardioMuscles] =  useState<string[]>([]);
  // Keeps track of the currentlty seclected required equipment
  const [currentCardioEquipment, setCurrentCardioEquipment] =  useState<string[]>([]);

  // Keeps track if the currently displayed exercises are cardio based or strength training
  const [cardioFocus, setCardioFocus] = useState(false);
  // Allows for errors to be caught
  const [error, setError] = useState<string | null>(null);


  // Selects the chosen option for filtering
  const chooseOption = (item :string, chosenItems: string[], setChosenItems: React.Dispatch<React.SetStateAction<string[]>>) =>
  {
    setChosenItems(chosenItems.includes(item) ? chosenItems.filter((m) => m != item) : [...chosenItems, item]);
  };

  useEffect(()=> {
    document.title = 'Fit-Logic'
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
        const exerciseList: Exercise[] = [];
        for (const muscleGroup in json){
          if (muscleGroup !== '_meta') 
            {
              exerciseList.push(...(json[muscleGroup] as Exercise[]));
            }
        }
        setExercise(exerciseList);
      })
      // Catches errors found while loading the JSON file and the exercise data
      .catch((error_found) =>{
        console.error('Could not load JSON file: ', error_found);
        setError('ERROR: Could not load the Muscle Training data.');
     })  
}, []);


useEffect(()=> {
  // Fetch the cardio exercise json file
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
        const cardioList: CardioExercise[] = [];
        for (const muscleGroup in json){
          if (muscleGroup !== '_meta') 
            {
              cardioList.push(...(json[muscleGroup] as CardioExercise[]));
            }
        }
        setCardioExercise(cardioList);
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
  const filteredStrengthExerciseList = allExercisesList.filter((exercise) => {
    const muscleFound = currentMuscles.length === 0 || currentMuscles.some((muscle) => 
      exercise.MusclesWorked.includes(muscle));
    const equipmentFound = currentEquipment.length === 0 || currentEquipment.some((equip) =>
    exercise.EquipmentOptions.includes(equip))
    return muscleFound && equipmentFound;
  })

  const filteredCardioExerciseList = allCardioList.filter((exercise) => {
    const muscleFound = currentCardioMuscles.length === 0 || currentCardioMuscles.some((muscle) => 
      exercise.MusclesWorked.includes(muscle));
    const equipmentFound = currentCardioEquipment.length === 0 || currentCardioEquipment.some((equip) =>
    exercise.EquipmentOptions.includes(equip))

    return muscleFound && equipmentFound;
  })

  // List of all muscle targets to be used for buttons
  const muscleTargets = ['Chest', 'Back', 'Shoulders', 'Triceps', 'Biceps', 'Abs', 'Quads', 'Hamstrings', 'Glutes', 'Calves'];
  // List of all possible equipment options to be used for buttons
  const equipmentOptions = ['None', 'Dumbbells', 'Barbell', 'Bench', 'Cable Machine', 'Weights', 'Medicine Ball', 'Resistance Bands'];
  const cardioTargets = ["Whole Body", "Quads", "Hamstrings", "Calves", "Glutes","Hip Flexors", "Shoulders", "Chest", "Arms", "Back", "Core"];
  const cardioEquipment = ["Nothing", "Treadmill", "Weights", "Bicycle", "Stationary Bike", "Pool", "Jumprope"];


return(
    // Main Exercise Page Header and Title
    /// To center everything type className = "containter" after <main
    <main>
    <div className='TopBar'>
      <div className='Title'> Fit Logic</div>
      <nav>
        <Link href="/">Home</Link>
        <h2>Exercises</h2>
        <Link href="/calculator">Calculator</Link>
        <a>Placeholder</a>
        <a>Placeholder</a>
      </nav>
    </div>

    <div className='dropDown'> Exercise Type
        <div className='content'>
          <a onClick={() => setCardioFocus(false)}>Strength Exercises</a>
          <a onClick={() => setCardioFocus(true)}>Cardio Exercises</a>
        </div>
    </div>

    {/* Buttons and display for the targeted muscle groups */}
   
      {!cardioFocus &&
      (
        <div className='dropDown'>Muscles Targeted
          <div className='content'>
              {muscleTargets.map((muscle) =>(
                <a key = {muscle}
                  // When the button is clicked update the exercise filter to include or exclude the selected muscle group
                  onClick={() => chooseOption(muscle, currentMuscles, setCurrentMuscles)}
                  style={{
                    backgroundColor: currentMuscles.includes(muscle) ? '#93B7BE' : 'white',
                    color: currentMuscles.includes(muscle) ? 'white' : 'black',
                  }}
                  >
                    {muscle}
                  </a>
              ))}
              </div>
          </div>
          )}          
        {/* Buttons and display for the possible equipment options */}
        {!cardioFocus &&
        (    
          <div className='dropDown'>Equipment Options:
            <div className='content'>
            {equipmentOptions.map((equipm) =>(
              <a key = {equipm}
                // When the button is clicked update the exercise filter to include or exclude the selected muscle group
                onClick={() => chooseOption(equipm, currentEquipment, setCurrentEquipment)}
                style={{
                  backgroundColor: currentEquipment.includes(equipm) ? '#93B7BE' : 'white',
                  color: currentEquipment.includes(equipm) ? 'white' : 'black',
                }}
                >
                  {equipm}
                </a>
            ))}
            </div>
          </div>
      )}
     
      {/* Display Exercises */}
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
      {filteredStrengthExerciseList.length === 0 && !error && <h2>None of the exercises match these filters.</h2>}
      {!cardioFocus &&(
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '50px', justifyContent: 'flex-start'}}>
        {filteredStrengthExerciseList.map((exercise, index) => (
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

      {cardioFocus &&
      (
        <div className='dropDown'>Muscles Targeted:
            <div className='content'>
              {cardioTargets.map((muscle) =>(
                <a 
                  key = {muscle}
                  // When the button is clicked update the exercise filter to include or exclude the selected muscle group
                  onClick={() => chooseOption(muscle, currentCardioMuscles, setCurrentCardioMuscles)}
                  style={{
                    backgroundColor: currentCardioMuscles.includes(muscle) ? '#93B7BE' : 'white',
                    color: currentCardioMuscles.includes(muscle) ? 'white' : 'black',
                  }}
                  >
                    {muscle}
                  </a>
            ))}
            </div>
          </div>
          )}          
        {/* Buttons and display for the possible equipment options */}
        {cardioFocus &&
        (    
          <div className='dropDown'>Equipment Options:
            <div className='content'>
              {cardioEquipment.map((equipm) =>(
                <a
                  key = {equipm}
                  // When the button is clicked update the exercise filter to include or exclude the selected muscle group
                  onClick={() => chooseOption(equipm, currentCardioEquipment, setCurrentCardioEquipment)}
                  style={{
                    backgroundColor: currentCardioEquipment.includes(equipm) ? '#93B7BE' : 'white',
                    color: currentCardioEquipment.includes(equipm) ? 'white' : 'black',}}
                  >
                    {equipm}
                  </a>
              ))}
            </div>
          </div>
      )}
     
      {/* Display Exercises */}
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
      {filteredCardioExerciseList.length === 0 && !error && <h2>None of the exercises match these filters.</h2>}
      {cardioFocus &&(
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '50px', justifyContent: 'flex-start'}}>
        {filteredCardioExerciseList.map((exercise, index) => (
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