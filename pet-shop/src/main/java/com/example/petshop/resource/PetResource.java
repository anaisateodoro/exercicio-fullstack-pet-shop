package com.example.petshop.resource;

import com.example.petshop.dtos.PetDto;
import com.example.petshop.model.PetModel;
import com.example.petshop.repo.PetRepo;
import com.example.petshop.service.PetServ;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/orders")
public class PetResource {

    @Autowired
    private final PetServ petServ;

    @Autowired
    private final PetRepo petRepo;

    public PetResource(PetServ petServ, PetRepo petRepo) {
        this.petServ = petServ;
        this.petRepo = petRepo;
    }


    @PostMapping
    public ResponseEntity<Object> savePetOrder(@RequestBody @Valid PetDto petDto){
        PetModel petModel = new PetModel();

        BeanUtils.copyProperties(petDto, petModel);

        return ResponseEntity.status(HttpStatus.CREATED).body(petServ.savePetOrder(petModel));
    }

    @GetMapping
    public ResponseEntity<List<PetModel>> getAllPetOrders(){
        return ResponseEntity.status(HttpStatus.FOUND).body(petServ.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getPetOrderById(@PathVariable(value = "id") Long id){
        Optional<PetModel> petModelOptional = petRepo.findById(id);

        if(!petModelOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not founded!");
        } else{
            return ResponseEntity.status(HttpStatus.FOUND).body(petModelOptional.get());
        }
    }


    @PutMapping("/edit/{id}")
    public ResponseEntity<Object> editPetOrder(@PathVariable(value = "id") Long id, @RequestBody PetDto petDto){
        Optional<PetModel> petModelOptional = petRepo.findById(id);

        if(!petModelOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Couldn't find this Order!");
        } else {
            PetModel petModel = petModelOptional.get();

            petModel.setPetName(petDto.getPetName());
            petModel.setSpecie(petDto.getSpecie());
            petModel.setBreed(petDto.getBreed());
            petModel.setHeight(petDto.getHeight());
            petModel.setCoatType(petDto.getCoatType());
            petModel.setTutorName(petDto.getTutorName());
            petModel.setTutorCel(petDto.getTutorCel());

            BeanUtils.copyProperties(petDto, petModel);
            petModel.setId(petModelOptional.get().getId());

            return ResponseEntity.status(HttpStatus.OK).body(petServ.savePetOrder(petModel));
        }
    }

    @Transactional
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deletePetOrder(@PathVariable(value = "id") Long id){
        Optional<PetModel> petModelOptional = petRepo.findById(id);

        if(!petModelOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Couldn't find this order!");
        } else {
            petServ.delete(petModelOptional.get());
            return ResponseEntity.status(HttpStatus.OK).body("Order " + id + " successfully deleted!");
        }
    }

}
