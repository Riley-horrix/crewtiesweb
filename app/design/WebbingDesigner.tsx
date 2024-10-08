"use client";
/**
 * @file WebbingDesigner.tsx
 * @author Riley Horrix (riley@horrix.com)
 * @brief Webbing designer component
 * @version 0.1
 * @date 2024-08-08
 * 
 * Copyright (c) Riley Horrix 2024
 * 
 */

import WebbingState, { allWebbingFonts, emptyLayerState, fontEnumToString, LayerState, stringToFontEnum, WebbingFonts, WebbingLayer } from "@/lib/WebbingState"
import { StateFuncs } from "./page"

import React, { useState } from "react";
import { Button, Checkbox, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, SharedSelection, Slider } from "@nextui-org/react";
import WebbingSlider from "@/components/webbing/Slider";

interface Props {
  state: WebbingState,
  stateFuncs: StateFuncs
}

const defaultLayer = emptyLayerState();

/**
 * The webbing designer component allows a user to change or create a webbing design.
 * @param state The WebbingState object.
 * @param stateFuncs The WebbingState mutator functions of type StateFuncs.
 * @returns 
 */
export default function WebbingDesigner({ state, stateFuncs }: Props) {
  const layerIds = state.layers.map((item) => item.id);
  const newLayerId = () => {
    var id = layerIds.length + 1;

    // Check to see if user is trying to be naughty
    while (layerIds.some((item) => item === ("Layer " + id.toString()))) {
      id += 1;
    }

    return "Layer " + id.toString();
  }
  const newlayer: () => WebbingLayer = () => {
    const emptyLayer = emptyLayerState();
    emptyLayer.id = newLayerId();
    return emptyLayer;
  }

  const [selectedLayerId, setSelectedLayerId] = useState<string>(state.layers.length !== 0 ? state.layers[0].id : "");

  const layers = state.layers.filter((layer) => layer.id == selectedLayerId);
  const selectedLayer = layers.length ? layers[0] : defaultLayer;

  const setLayerState = (state: LayerState) => {
    stateFuncs.editLayer(selectedLayerId, "state", state);
  }

  const setLayerBackground = (bg: string) => {
    stateFuncs.editLayer(selectedLayerId, "bgColor", bg);
  }

  enum Direction {
    UP,
    DOWN
  }

  const moveLayer = (dir: Direction) => {
    const foundIndex = state.layers.findIndex((layer) => layer.id === selectedLayerId);

    // This is disgusting and I hate it
    const index =
      foundIndex === -1 ?
        0 :
        (dir === Direction.DOWN ?
          (foundIndex === (state.layers.length - 1) ?
            (state.layers.length - 1) :
            foundIndex + 1
          ) :
          (foundIndex === 0 ?
            0 :
            foundIndex - 1
          )
        )

    console.log("index", index);
    stateFuncs.moveLayerToIndex(selectedLayerId, index);
  }

  const downloadStrapFile = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(state)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = state.name + ".strap";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  const uploadStrapFile = (file: File) => {
    const fr = new FileReader();
    fr.readAsText(file);
    fr.onload = (ev) => {
      if (!ev.target?.result) { return; }
      if (typeof ev.target.result !== "string") { return; }
      const strap: WebbingState = JSON.parse(ev.target.result);
      stateFuncs.setWebbingState(strap);
    }
  }

  const renderAdvancedEditor = () => {
    if (!selectedLayer) return;
    switch (selectedLayer.state) {
      case LayerState.NONE:
        return null;

      case LayerState.TEXT:
        console.log("render")
        return (
          <div className="w-full flex flex-col">
            <Input color="primary" type="text" label="Webbing Text" variant="underlined" placeholder="Webbing Text Here..." value={selectedLayer.text} onValueChange={(val) => { stateFuncs.editLayer(selectedLayerId, "text", val) }} defaultValue={selectedLayer.text} />
            <div className="w-full flex flex-col sm:flex-row gap-y-3 sm:gap-y-0 justify-between items-center mt-3 mb-1">
              <FontSelect changeFont={(val) => { stateFuncs.editLayer(selectedLayerId, "font", val) }} font={selectedLayer.font} className="w-full sm:w-1/2 sm:mr-[5vw]" />
              <Input size="md" type="color" color="primary" label="Font Color" variant="underlined" placeholder={selectedLayer.bgColor} onChange={((val) => stateFuncs.editLayer(selectedLayerId, "fontColor", val.target.value))} classNames={{ base: "w-full sm:w-1/2", label: "text-lg" }} defaultValue={selectedLayer.fontColor} />
            </div>
            <Checkbox color="primary" classNames={{ base: "mb-3", label: "text-black" }} isSelected={selectedLayer.bold} onValueChange={(val) => { stateFuncs.editLayer(selectedLayerId, "bold", val) }}>Bold</Checkbox>
            <Button color="danger" className="w-full" onPress={() => stateFuncs.editLayer(selectedLayerId, "state", LayerState.NONE)}>Remove Text</Button>
          </div>
        );

      case LayerState.LOGO:
        return (
          <div className="w-full flex flex-col gap-y-4">
            <ImageUpload setImageData={(val) => stateFuncs.editLayer(selectedLayerId, "img", val)} />
            <Button color="danger" className="w-full" onPress={() => setLayerState(LayerState.NONE)}>Remove Logo</Button>
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col items-center justify-start w-full">
      {/* TODO - change to a custom input field. */}
      {/* {!editTitle && <h1 className="text-3xl mt-[10px]">{state.name}{' '}<i className="bi bi-pencil-square"  onClick={(e) => {setEditTitle(true); e.preventDefault()}}></i></h1>} */}
      <Input endContent={<i className="bi bi-pencil-square text-xl"></i>} spellCheck={false} size="lg" classNames={{ base: "mb-3", input: "text-3xl font-bold" }} variant="underlined" defaultValue="My design" value={state.name} onValueChange={(name) => stateFuncs.setWebbingName(name)} onClick={(e) => { e.preventDefault() }} />
      {/* <Divider className="my-3 bg-secondary" /> */}
      <WebbingSlider label="Angle" min={-90} max={90} step={1} start={0} init={0} valueDisplay={(num) => `${num} deg`} onChangeFunc={(val) => { stateFuncs.setWebbingAnlge(typeof val == "number" ? val : 0) }} tooltip="The angle that the design is rotated on the webbing." />
      <Divider className="my-4 bg-[#dddddd] h-[3px]" />
      <div className="flex sm:flex-row sm:px-0 px-3 gap-3 sm:gap-0 justify-between w-full flex-col">
        <LayerSelect layers={layerIds} selectLayer={(layer) => { setSelectedLayerId(layer); }} start={selectedLayerId} />
        <div className="flex flex-row justify-between gap-x-[2vw]">
          <Button color="primary" onPress={() => moveLayer(Direction.UP)}><i className="bi bi-chevron-up"></i></Button>
          <Button color="primary" onPress={() => moveLayer(Direction.DOWN)}><i className="bi bi-chevron-down"></i></Button>
        </div>
        <Button color="primary" endContent={<i className="bi bi-plus-circle-fill"></i>} onPress={() => { const layer = newlayer(); stateFuncs.appendLayer(layer); setSelectedLayerId(layer.id); }}>Add new layer</Button>
      </div>
      {selectedLayerId && selectedLayer.id !== "" && (
        <div className="flex flex-col items-center w-full mt-3">
          <WebbingSlider label="Horizontal Spacing" min={0} max={50} step={1} init={selectedLayer.hspace} valueDisplay={(num) => `${num}`} onChangeFunc={(val) => { stateFuncs.editLayer(selectedLayerId, "hspace", val) }} tooltip="The horizontal space between elements in this layer." />
          <WebbingSlider label="Vertical Spacing" min={0} max={50} step={1} init={selectedLayer.vspace} valueDisplay={(num) => `${num}`} onChangeFunc={(val) => { stateFuncs.editLayer(selectedLayerId, "vspace", val) }} tooltip="The vertical space between other layers and this layer." />
          <WebbingSlider label="Size" min={2} max={200} step={1} init={selectedLayer.size} valueDisplay={(num) => `${num}`} onChangeFunc={(val) => { stateFuncs.editLayer(selectedLayerId, "size", val) }} tooltip="The text font size or the width of the image on the webbing." />
          <WebbingSlider label="Row Offset" min={1} max={10} step={1} init={selectedLayer.rowoff} valueDisplay={(num) => `${num} rows`} onChangeFunc={(val) => { stateFuncs.editLayer(selectedLayerId, "rowoff", val) }} tooltip="How many rows it takes for this layer to repeat itself. (WARNING can cause design to become non-repeating)" />
          {/* TODO : if you drag picker it re-renders webbing multiple times. */}
          <Input color="primary" size="md" type="color" label="Background Color" variant="underlined" placeholder={selectedLayer.bgColor} onValueChange={(val) => setLayerBackground(val)} classNames={{ base: "max-w-lg my-3", label: "text-lg" }} defaultValue={selectedLayer.bgColor} value={selectedLayer.bgColor} />
          <div className="flex flex-row justify-around w-full mt-2 mb-2 sm:px-0 gap-x-[10px]">
            <Button color="primary" startContent={<i className="bi bi-fonts"></i>} onPress={() => setLayerState(LayerState.TEXT)}><p className="hidden xs:block">Use Text</p></Button>
            <Button color="primary" startContent={<i className="bi bi-image"></i>} onPress={() => setLayerState(LayerState.LOGO)}><p className="hidden xs:block">Use Logo</p></Button>
          </div>
          {renderAdvancedEditor() || <Button color="danger" className="w-full mt-4" onPress={() => stateFuncs.removeLayer(selectedLayerId)}>Remove Layer</Button>}
          <Divider className="my-4 w-full h-[3px]" />
          <Button color="secondary" variant="ghost" className="w-full" onPress={() => downloadStrapFile()}>Save Design</Button>
          <label className="w-full text-left mt-3 pl-1">Load .strap file :</label>
          <Input type="file" color="secondary" variant="flat" className="w-full mt-2" accept=".strap"
            onChange={(val) => val.target.files ? uploadStrapFile(val.target.files[0]) : console.log("No file")}>Upload design</Input>
        </div>
      )
      }
    </div >
  );
}

interface FontSelectProps {
  changeFont: (arg0: WebbingFonts) => void,
  font: WebbingFonts,
  className: string
}


function FontSelect(props: FontSelectProps) {
  const availableFonts: WebbingFonts[] = allWebbingFonts();

  const [selectedFont, setSelected] = useState<WebbingFonts>(props.font);

  const handleSelect = (val: SharedSelection) => {
    const value = stringToFontEnum(val.currentKey ? val.currentKey : "")
    setSelected(value);
    props.changeFont(value);
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          color="primary"
          className={`capitalize ${props.className}`}
        >
          {fontEnumToString(selectedFont)}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Layer selection"
        color="secondary"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedFont.toString()}
        // onSelectionChange={handleSelected}
        onSelectionChange={handleSelect}
      >
        {availableFonts.map((item) => {
          return (
            <DropdownItem key={item}>{fontEnumToString(item)}</DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  )
}


interface LayerSelectProps {
  layers: string[],
  className?: string,
  selectLayer: (arg0: string) => void,
  start?: string
}

function LayerSelect({ layers, selectLayer, className = "", start = "" }: LayerSelectProps) {
  const [selectedValue, setSelected] = useState(start === "" ? "Select Layer" : start);

  const handleSelectLayer = (val: SharedSelection) => {
    const value = val.currentKey ? val.currentKey : "Select Layer";
    setSelected(value);
    selectLayer(value);
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          color="primary"
          className={`capitalize ${className}`}
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        color="secondary"
        aria-label="Layer selection"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedValue}
        // onSelectionChange={handleSelected}
        onSelectionChange={handleSelectLayer}
      >
        {layers.map((item) => {
          return (
            <DropdownItem key={item}>{item}</DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}

interface ImageUploadProps {
  setImageData: (arg0: string) => void
}

function ImageUpload(props: ImageUploadProps) {

  const onUpload = (image: File | null) => {
    if (!image) return;

    // check if the file selected is not an image file
    if (!image.type.includes('image')) {
      return alert('Only images are allowed!');
    }

    // check if size (in bytes) exceeds 10 MB
    if (image.size > 10_000_000) {
      return alert('Maximum upload size is 10MB!');
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);

    fileReader.onload = (fileReaderEvent) => {
      props.setImageData(typeof fileReaderEvent.target?.result == "string" ? fileReaderEvent.target.result : "")
    }
  }
  return (
    <Input color="primary" type="file" accept="image/*" onChange={(val) => onUpload(val.target.files ? val.target.files[0] : null)} />
  )
}