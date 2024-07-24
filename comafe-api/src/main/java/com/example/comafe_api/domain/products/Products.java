package com.example.comafe_api.domain.products;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Table(name = "products")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column
    private String title;

    @Column
    private String imgUrl;

    @Column
    private String imgName;

    @Column
    private String description;

    @Column
    private Double price;

    @Transient
    @JsonIgnore
    private MultipartFile img;

}
