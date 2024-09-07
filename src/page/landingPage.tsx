import "./index.css";
import Input from "../components/input/input";
import Slider from "../components/input/slider/slider";
import Select from "../components/select/select";
import Button from "../components/button/button";
import { FormEvent, useEffect, useState } from "react";

interface IFormValues {
  text: string;
  speechRate: number;
  speechPitch: number;
  speechType: SpeechSynthesisVoice | null;
}

export default function LandingPage() {
  const [formValues, setFormValues] = useState<IFormValues>({
    text: "",
    speechRate: 1,
    speechPitch: 1,
    speechType: null,
  });

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setFormValues((prevValues) => ({
          ...prevValues,
          speechType: availableVoices[0], // Default to the first voice
        }));
      }
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    loadVoices(); // Ensure voices are loaded initially
  }, []);

  const handleChange = (name: string, value: any) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSpeak = (e: FormEvent) => {
    e.preventDefault();
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      console.error("Already speaking..");
      return;
    }
    if (formValues.text === "") {
      console.error("No text provided.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(formValues.text);
    utterance.voice = formValues.speechType as SpeechSynthesisVoice;
    utterance.rate = formValues.speechRate;
    utterance.pitch = formValues.speechPitch;
    synth.speak(utterance);
  };

  return (
    <section className="landing_container">
      <h1 className="header">Text to Speech</h1>
      <form className="form" onSubmit={handleSpeak}>
        <div className="form_group">
          <label htmlFor="text">Text</label>
          <Input
            placeholder="Enter text"
            id="text"
            rows={8}
            value={formValues.text}
            onChange={(e) => handleChange("text", e.target.value)}
          />
        </div>
        <div className="form_group">
          <div className="form_group_head">
            <label htmlFor="speechRate">Speech Rate</label>
            <div className="range-value">{formValues.speechRate}</div>
          </div>
          <Slider
            min={0.5}
            max={2}
            step={0.1}
            value={formValues.speechRate}
            onChange={(e) => handleChange("speechRate", e.target.value)}
          />
        </div>
        <div className="form_group">
          <div className="form_group_head">
            <label htmlFor="speechPitch">Speech Pitch</label>
            <div className="range-value">{formValues.speechPitch}</div>
          </div>
          <Slider
            min={0}
            max={2}
            step={0.1}
            value={formValues.speechPitch}
            onChange={(e) => handleChange("speechPitch", e.target.value)}
          />
        </div>
        <div className="form_group">
          <label htmlFor="speechType">Select Speech Type</label>
          <Select
            value={formValues.speechType?.name || ""}
            onChange={(e) => {
              const selectedVoice = voices.find(
                (voice) => voice.name === e.target.value
              );
              handleChange("speechType", selectedVoice);
            }}
          >
            {voices.map((voice) => (
              <option value={voice.name} key={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </Select>
        </div>
        <Button>Speak</Button>
      </form>
    </section>
  );
}
