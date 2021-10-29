<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: gradido/BasicTypes.proto

namespace Proto\Gradido;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>proto.gradido.SignaturePair</code>
 */
class SignaturePair extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>bytes pubKey = 1;</code>
     */
    protected $pubKey = '';
    /**
     * Generated from protobuf field <code>bytes signature = 2;</code>
     */
    protected $signature = '';

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type string $pubKey
     *     @type string $signature
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Gradido\BasicTypes::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>bytes pubKey = 1;</code>
     * @return string
     */
    public function getPubKey()
    {
        return $this->pubKey;
    }

    /**
     * Generated from protobuf field <code>bytes pubKey = 1;</code>
     * @param string $var
     * @return $this
     */
    public function setPubKey($var)
    {
        GPBUtil::checkString($var, False);
        $this->pubKey = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>bytes signature = 2;</code>
     * @return string
     */
    public function getSignature()
    {
        return $this->signature;
    }

    /**
     * Generated from protobuf field <code>bytes signature = 2;</code>
     * @param string $var
     * @return $this
     */
    public function setSignature($var)
    {
        GPBUtil::checkString($var, False);
        $this->signature = $var;

        return $this;
    }

}

